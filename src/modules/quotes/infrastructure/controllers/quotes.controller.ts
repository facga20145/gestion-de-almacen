import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorResponses,
  ApiSuccessResponse,
} from 'src/utils/decorators/api-swagger.decorator';
import { EmailService } from 'src/utils/email.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/utils/guards/auth.guard';

// Use cases
import { QuotesCreateUseCase } from '../../application/use-cases/commands/quotes-create.use-case';
import { QuotesUpdateUseCase } from '../../application/use-cases/commands/quotes-update.use-case';
import { QuotesDeleteUseCase } from '../../application/use-cases/commands/quotes-delete.use-case';
import { QuotesFindOneUseCase } from '../../application/use-cases/queries/quotes-find-one.use-case';
import { QuotesFindAllUseCase } from '../../application/use-cases/queries/quotes-find-all.use-case';

// DTOs
import { QuotesCreateRequestDto } from '../../application/dtos/quotes-create-request.dto';
import { QuotesCreateResponseDto } from '../../application/dtos/quotes-create-response.dto';
import { QuotesUpdateRequestDto } from '../../application/dtos/quotes-update-request.dto';
import { QuotesUpdateResponseDto } from '../../application/dtos/quotes-update-response.dto';
import { SendEmailQuoteDto } from '../../application/dtos/send-email-quote.dto';

import { CustomResponseInterceptor } from 'src/utils/interceptors/customresponse.interceptor';

@ApiTags('Quotes')
@UseGuards(AuthGuard)
@UseInterceptors(CustomResponseInterceptor)
@Controller('quotes')
export class QuotesController {
  constructor(
    private readonly createUseCase: QuotesCreateUseCase,
    private readonly updateUseCase: QuotesUpdateUseCase,
    private readonly deleteUseCase: QuotesDeleteUseCase,
    private readonly findOneUseCase: QuotesFindOneUseCase,
    private readonly findAllUseCase: QuotesFindAllUseCase,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) { }


  @Post('send-email')
  @ApiOperation({
    summary: 'Enviar cotización por email',
    description: 'Endpoint para enviar cotizaciones por email usando Gmail con App Password. Envía un email con formato HTML profesional incluyendo los detalles de la cotización, productos, precios y totales.',
  })
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Email enviado correctamente',
  )
  async sendEmail(@Body() request: SendEmailQuoteDto) {
    try {
      console.log('📧 Intentando enviar email a:', request.emailDestino);
      console.log('📋 Cotización:', request.codigo);

      // Generar HTML de la cotización
      const html = this.generateQuoteHTML(request);

      // Enviar email usando el servicio de OAuth2
      const result = await this.emailService.sendEmail(
        request.emailDestino,
        `Cotización de Repuestos - ${request.codigo}`,
        html
      );

      return {
        message: 'Email enviado correctamente',
        emailDestino: request.emailDestino,
        codigo: request.codigo,
        messageId: result.messageId,
        status_code: HttpStatus.OK,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        message: 'Error al enviar el email',
        error: error.message,
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Post(':id/send-email')
  @ApiOperation({
    summary: 'Enviar cotización por email por ID',
    description: 'Envía por email la cotización indicada usando su ID. Obtiene todos los datos desde la base de datos.',
  })
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Email enviado correctamente',
  )
  async sendEmailById(@Param('id') id: string, @Req() req: any) {
    try {
      const quote = await this.findOneUseCase.run(parseInt(id));

      const emailRequest: SendEmailQuoteDto = {
        emailDestino: quote.clienteEmail,
        clienteNombre: quote.clienteNombre,
        codigo: quote.codigo,
        fecha: quote.fecha,
        vendedorNombre:
          quote.usuario?.nombre ||
          quote.usuario?.email ||
          req.user?.email ||
          'Vendedor',
        total: quote.total,
        items: quote.items.map((item: any) => ({
          nombre: item.product?.nombre || 'Producto',
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          subtotal: item.subtotal,
        })),
      };

      const html = this.generateQuoteHTML(emailRequest);
      const result = await this.emailService.sendEmail(
        emailRequest.emailDestino,
        `Cotización de Repuestos - ${emailRequest.codigo}`,
        html,
      );

      return {
        message: 'Email enviado correctamente',
        emailDestino: emailRequest.emailDestino,
        codigo: emailRequest.codigo,
        messageId: result.messageId,
        status_code: HttpStatus.OK,
      };
    } catch (error) {
      console.error('Error sending email by ID:', error);
      return {
        message: 'Error al enviar el email',
        error: error.message,
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  private generateQuoteHTML(request: SendEmailQuoteDto): string {
    const itemsHTML = request.items.map(item => `
      <tr>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precioUnitario.toFixed(2)}</td>
        <td>$${item.subtotal.toFixed(2)}</td>
      </tr>
    `).join('');

    const currentYear = new Date().getFullYear();

    return `
<!DOCTYPE html>
<html lang='es'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Cotización de Repuestos Automotrices</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        color: #333;
        padding: 0;
        margin: 0;
      }
      .email-container {
        max-width: 650px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
      }
      .content {
        padding: 30px;
      }
      .quote-info {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 25px;
      }
      .quote-info p {
        margin: 8px 0;
        font-size: 15px;
      }
      .quote-info strong {
        color: #667eea;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      th {
        background: #667eea;
        color: white;
        padding: 12px;
        text-align: left;
        font-size: 14px;
      }
      td {
        padding: 12px;
        border-bottom: 1px solid #e9ecef;
      }
      tr:nth-child(even) {
        background: #f8f9fa;
      }
      .total-box {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        text-align: right;
        font-size: 24px;
        font-weight: bold;
      }
      .total-box span {
        font-size: 28px;
      }
      .footer {
        background: #2c3e50;
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 13px;
      }
      .code {
        background: #e7f3ff;
        border-left: 4px solid #667eea;
        padding: 15px;
        margin: 20px 0;
        border-radius: 4px;
      }
      .code strong {
        color: #667eea;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <div class='email-container'>
      <div class='header'>
        <h1>📋 Cotización de Repuestos Automotrices</h1>
      </div>
      
      <div class='content'>
        <p>Estimado/a <strong>${request.clienteNombre}</strong>,</p>
        
        <p>Gracias por confiar en nuestros servicios. Adjuntamos la cotización solicitada:</p>
        
        <div class='quote-info'>
          <p><strong>📦 Código de Cotización:</strong></p>
          <div class='code'>
            <strong>${request.codigo}</strong>
          </div>
          <p><strong>📅 Fecha:</strong> ${request.fecha}</p>
          <p><strong>👤 Atendido por:</strong> ${request.vendedorNombre}</p>
        </div>
        
        <h3 style='color: #667eea; margin-top: 30px;'>Detalle de Productos:</h3>
        
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
        
        <div class='total-box'>
          Total: $<span>${request.total.toFixed(2)}</span>
        </div>
        
        <p style='margin-top: 30px;'>
          Esta cotización tiene una validez de 15 días. Para realizar su pedido o consultar disponibilidad, 
          puede contactarnos a través de nuestros canales de atención.
        </p>
        
        <p>¡Estamos a su disposición para atenderlo!</p>
        
        <p>Atentamente,<br><strong>Equipo de Ventas</strong></p>
      </div>
      
      <div class='footer'>
        <p>Repuestos Automotrices © ${currentYear}</p>
      </div>
    </div>
  </body>
</html>
    `;
  }

  @Post()
  @ApiOperation({
    summary: 'Crear nueva cotización',
    description: 'Permite crear una nueva cotización con código único',
  })
  @ApiSuccessResponse(
    HttpStatus.CREATED,
    'Cotización creada correctamente',
    QuotesCreateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async create(@Body() request: QuotesCreateRequestDto, @Req() req: any) {
    try {
      // Siempre obtener el usuario desde el JWT para evitar depender de seeds o datos enviados por el frontend
      const usuarioId = req.user?.profileId;

      if (!usuarioId) {
        throw new UnauthorizedException(
          'No se pudo determinar el usuario autenticado para la cotización',
        );
      }

      const result = await this.createUseCase.run(request, usuarioId);

      // Enviar correo automáticamente después de crear la cotización
      try {
        const quote = await this.findOneUseCase.run(result.id);

        const emailRequest: SendEmailQuoteDto = {
          emailDestino: quote.clienteEmail,
          clienteNombre: quote.clienteNombre,
          codigo: quote.codigo,
          fecha: quote.fecha,
          vendedorNombre:
            quote.usuario?.nombre ||
            quote.usuario?.email ||
            req.user?.email ||
            'Vendedor',
          total: quote.total,
          items: quote.items.map((item: any) => ({
            nombre: item.product?.nombre || 'Producto',
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            subtotal: item.subtotal,
          })),
        };

        const html = this.generateQuoteHTML(emailRequest);
        await this.emailService.sendEmail(
          emailRequest.emailDestino,
          `Cotización de Repuestos - ${emailRequest.codigo}`,
          html,
        );
      } catch (emailError) {
        // eslint-disable-next-line no-console
        console.error('❌ Error al enviar email de cotización:', emailError);
        // No rompemos la creación de la cotización si el correo falla
      }

      return result;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('❌ Error al crear cotización:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener cotización por ID',
    description: 'Permite obtener una cotización específica con todos sus detalles',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Cotización encontrada correctamente',
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async findOne(@Param('id') id: string) {
    return await this.findOneUseCase.run(parseInt(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Listar cotizaciones',
    description: 'Permite obtener una lista paginada de cotizaciones',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Cotizaciones encontradas correctamente',
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async findAll(@Query() params: any) {
    return await this.findAllUseCase.run(params);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar cotización',
    description: 'Permite actualizar el estado de una cotización (PENDIENTE, ENVIADA, ACEPTADA, RECHAZADA)',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Cotización actualizada correctamente',
    QuotesUpdateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async update(@Param('id') id: string, @Body() request: QuotesUpdateRequestDto) {
    return await this.updateUseCase.run(parseInt(id), request);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar cotización',
    description: 'Permite marcar una cotización como rechazada',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Cotización eliminada correctamente',
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async delete(@Param('id') id: string) {
    return await this.deleteUseCase.run(parseInt(id));
  }
}