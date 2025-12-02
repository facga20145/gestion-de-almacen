import {
  Injectable,
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { QuotesRepositoryPort } from '../ports/quotes-repository.port';
import { QuotesCreateRequestDto } from 'src/modules/quotes/application/dtos/quotes-create-request.dto';
import { QuotesCreateResponseDto } from 'src/modules/quotes/application/dtos/quotes-create-response.dto';
import { QuotesUpdateRequestDto } from 'src/modules/quotes/application/dtos/quotes-update-request.dto';
import { QuotesUpdateResponseDto } from 'src/modules/quotes/application/dtos/quotes-update-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuotesRepositoryImpl implements QuotesRepositoryPort {
  constructor(private readonly prisma: PrismaService) { }

  // Función para generar código de cotización
  private generateQuoteCode(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `COT-${timestamp}-${random}`;
  }

  async create(request: QuotesCreateRequestDto, usuarioId: number): Promise<QuotesCreateResponseDto> {
    try {
      // Verificar que el usuario existe antes de crear la cotización
      const usuario = await this.prisma.user.findUnique({
        where: { id: usuarioId },
      });

      if (!usuario) {
        throw new NotFoundException(`User with ID ${usuarioId} not found for quote creation`);
      }

      // Calcular el total
      const total = request.items.reduce((sum, item) => {
        return sum + (item.cantidad * item.precioUnitario);
      }, 0);

      const codigo = this.generateQuoteCode();

      // Crear la cotización con sus items en una transacción
      const quote = await this.prisma.$transaction(async (tx) => {
        // Crear la cotización
        const createdQuote = await tx.quote.create({
          data: {
            codigo,
            clienteNombre: request.clienteNombre,
            clienteEmail: request.clienteEmail,
            total,
            usuarioId,
          },
        });

        // Crear los items de la cotización
        for (const item of request.items) {
          // Verificar que el producto existe
          const product = await tx.product.findUnique({
            where: { id: item.productId },
          });

          if (!product) {
            throw new NotFoundException(`Product with ID ${item.productId} not found`);
          }

          // Crear el item de cotización
          const subtotal = item.cantidad * item.precioUnitario;
          await tx.quoteItem.create({
            data: {
              quoteId: createdQuote.id,
              productId: item.productId,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              subtotal,
            },
          });
        }

        return createdQuote;
      });

      return {
        message: 'Quote created successfully',
        id: quote.id,
        codigo: quote.codigo,
        clienteNombre: quote.clienteNombre,
        clienteEmail: quote.clienteEmail,
        total: Number(quote.total),
        estado: quote.estado,
        status_code: HttpStatus.CREATED,
      };
    } catch (e) {
      console.log('Error in create quote:', e);

      if (e instanceof NotFoundException) {
        throw e;
      }

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002':
            throw new BadRequestException('Quote code already exists');
          case 'P2003':
            throw new BadRequestException('Invalid user ID');
          default:
            throw new BadRequestException('Database error occurred');
        }
      }

      throw new BadRequestException('Error creating quote');
    }
  }

  async update(id: number, request: QuotesUpdateRequestDto): Promise<QuotesUpdateResponseDto> {
    try {
      await this.prisma.quote.update({
        where: { id },
        data: {
          ...(request.estado && { estado: request.estado }),
        },
      });

      return {
        message: 'Quote updated successfully',
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2025':
            throw new NotFoundException('Quote not found');
          default:
            throw new BadRequestException('Database error occurred');
        }
      }

      throw new BadRequestException('Error updating quote');
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const quote = await this.prisma.quote.findUnique({
        where: { id },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  nombre: true,
                  precio: true,
                },
              },
            },
          },
          usuario: {
            select: {
              id: true,
              nombre: true,
              email: true,
            },
          },
        },
      });

      if (!quote) {
        throw new NotFoundException('Quote not found');
      }

      return {
        message: 'Quote found successfully',
        id: quote.id,
        codigo: quote.codigo,
        clienteNombre: quote.clienteNombre,
        clienteEmail: quote.clienteEmail,
        fecha: quote.fecha.toISOString(),
        total: Number(quote.total),
        estado: quote.estado,
        fechaRegistro: quote.fechaRegistro.toISOString(),
        usuario: quote.usuario,
        items: quote.items.map((item) => ({
          id: item.id,
          cantidad: item.cantidad,
          precioUnitario: Number(item.precioUnitario),
          subtotal: Number(item.subtotal),
          product: item.product,
        })),
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }

      throw new BadRequestException('Error finding quote');
    }
  }

  async findPaginated(params: any): Promise<any> {
    try {
      const page = Math.max(1, Number(params.index ?? 1));
      const limit = Math.max(1, Math.min(100, Number(params.limit ?? 10)));
      const skip = (page - 1) * limit;

      const where: Prisma.QuoteWhereInput = params.search
        ? {
          OR: [
            {
              clienteNombre: {
                contains: params.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              clienteEmail: {
                contains: params.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              codigo: {
                contains: params.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
        : {};

      const [items, totalItems] = await this.prisma.$transaction([
        this.prisma.quote.findMany({
          where,
          skip,
          take: limit,
          orderBy: { fecha: 'desc' },
          include: {
            usuario: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        }),
        this.prisma.quote.count({ where }),
      ]);

      return {
        items: items.map((quote) => ({
          message: 'Quote found successfully',
          id: quote.id,
          codigo: quote.codigo,
          clienteNombre: quote.clienteNombre,
          clienteEmail: quote.clienteEmail,
          fecha: quote.fecha.toISOString(),
          total: Number(quote.total),
          estado: quote.estado,
          fechaRegistro: quote.fechaRegistro.toISOString(),
          usuario: quote.usuario,
          status_code: HttpStatus.OK,
        })),
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      };
    } catch (e) {
      console.log('Error in findPaginated:', e);
      throw new BadRequestException('Error finding paginated quotes');
    }
  }

  async delete(id: number): Promise<any> {
    try {
      // Las cotizaciones no se eliminan físicamente por soft delete
      // pero pueden ser rechazadas o archivadas
      await this.prisma.quote.update({
        where: { id },
        data: { estado: 'RECHAZADA' },
      });

      return {
        message: 'Quote deleted successfully',
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Quote not found');
        }
      }
      throw new BadRequestException('Error deleting quote');
    }
  }
}