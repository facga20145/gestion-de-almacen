import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseInterceptors, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorResponses,
  ApiSuccessResponse,
} from 'src/utils/decorators/api-swagger.decorator';

// Use cases
import { SalesCreateUseCase } from '../../application/use-cases/commands/sales-create.use-case';
import { SalesFindOneUseCase } from '../../application/use-cases/queries/sales-find-one.use-case';
import { SalesFindAllUseCase } from '../../application/use-cases/queries/sales-find-all.use-case';

// DTOs
import { SalesCreateRequestDto } from '../../application/dtos/sales-create-request.dto';
import { SalesCreateResponseDto } from '../../application/dtos/sales-create-response.dto';

import { CustomResponseInterceptor } from 'src/utils/interceptors/customresponse.interceptor';

@ApiTags('Sales')
@UseInterceptors(CustomResponseInterceptor)
@Controller('sales')
export class SalesController {
  constructor(
    private readonly createUseCase: SalesCreateUseCase,
    private readonly findOneUseCase: SalesFindOneUseCase,
    private readonly findAllUseCase: SalesFindAllUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nueva venta',
    description: 'Permite crear una nueva venta y actualizar automáticamente el stock',
  })
  @ApiSuccessResponse(
    HttpStatus.CREATED,
    'Venta creada correctamente',
    SalesCreateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async create(@Body() request: SalesCreateRequestDto, @Req() req: any) {
    const usuarioId = req.user?.profileId || 1; // TODO: Obtener del JWT
    return await this.createUseCase.run(request, usuarioId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener venta por ID',
    description: 'Permite obtener una venta específica con todos sus detalles',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Venta encontrada correctamente',
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
    summary: 'Listar ventas',
    description: 'Permite obtener una lista paginada de ventas',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Ventas encontradas correctamente',
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async findAll(@Query() params: any) {
    return await this.findAllUseCase.run(params);
  }
}