import {
  Injectable,
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SalesRepositoryPort } from '../ports/sales-repository.port';
import { SalesCreateRequestDto } from 'src/modules/sales/application/dtos/sales-create-request.dto';
import { SalesCreateResponseDto } from 'src/modules/sales/application/dtos/sales-create-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SalesRepositoryImpl implements SalesRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(request: SalesCreateRequestDto, usuarioId: number): Promise<SalesCreateResponseDto> {
    try {
      // Calcular el total
      const total = request.items.reduce((sum, item) => {
        return sum + (item.cantidad * item.precioUnitario);
      }, 0);

      // Crear la venta con sus items en una transacción
      const sale = await this.prisma.$transaction(async (tx) => {
        // Crear la venta
        const createdSale = await tx.sale.create({
          data: {
            total,
            metodoPago: request.metodoPago,
            clienteNombre: request.clienteNombre,
            clienteEmail: request.clienteEmail,
            clienteTelefono: request.clienteTelefono,
            cotizacionId: request.cotizacionId,
            usuarioId,
          },
        });

        // Crear los items de la venta y actualizar el stock
        for (const item of request.items) {
          // Verificar que el producto existe y tiene stock suficiente
          const product = await tx.product.findUnique({
            where: { id: item.productId },
          });

          if (!product) {
            throw new NotFoundException(`Product with ID ${item.productId} not found`);
          }

          if (product.stock < item.cantidad) {
            throw new BadRequestException(
              `Insufficient stock for product ${product.nombre}. Available: ${product.stock}, Requested: ${item.cantidad}`
            );
          }

          // Crear el item de venta
          const subtotal = item.cantidad * item.precioUnitario;
          await tx.saleItem.create({
            data: {
              saleId: createdSale.id,
              productId: item.productId,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              subtotal,
            },
          });

          // Actualizar el stock del producto
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: product.stock - item.cantidad,
            },
          });
        }

        return createdSale;
      });

      return {
        message: 'Sale created successfully',
        id: sale.id,
        fecha: sale.fecha.toISOString(),
        total: Number(sale.total),
        metodoPago: sale.metodoPago,
        clienteNombre: sale.clienteNombre,
        clienteEmail: sale.clienteEmail,
        status_code: HttpStatus.CREATED,
      };
    } catch (e) {
      console.log('Error in create sale:', e);

      if (e instanceof NotFoundException || e instanceof BadRequestException) {
        throw e;
      }

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2003':
            throw new BadRequestException('Invalid user or quote ID');
          default:
            throw new BadRequestException('Database error occurred');
        }
      }

      throw new BadRequestException('Error creating sale');
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const sale = await this.prisma.sale.findUnique({
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
          cotizacion: {
            select: {
              id: true,
              codigo: true,
              total: true,
            },
          },
        },
      });

      if (!sale) {
        throw new NotFoundException('Sale not found');
      }

      return {
        message: 'Sale found successfully',
        id: sale.id,
        fecha: sale.fecha.toISOString(),
        total: Number(sale.total),
        metodoPago: sale.metodoPago,
        clienteNombre: sale.clienteNombre,
        clienteEmail: sale.clienteEmail,
        clienteTelefono: sale.clienteTelefono,
        fechaRegistro: sale.fechaRegistro.toISOString(),
        cotizacionId: sale.cotizacionId,
        usuario: sale.usuario,
        cotizacion: sale.cotizacion,
        items: sale.items.map((item) => ({
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

      throw new BadRequestException('Error finding sale');
    }
  }

  async findPaginated(params: any): Promise<any> {
    try {
      const page = Math.max(1, Number(params.index ?? 1));
      const limit = Math.max(1, Math.min(100, Number(params.limit ?? 10)));
      const skip = (page - 1) * limit;

      const where: Prisma.SaleWhereInput = params.search
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
            ],
          }
        : {};

      const [items, totalItems] = await this.prisma.$transaction([
        this.prisma.sale.findMany({
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
        this.prisma.sale.count({ where }),
      ]);

      return {
        items: items.map((sale) => ({
          message: 'Sale found successfully',
          id: sale.id,
          fecha: sale.fecha.toISOString(),
          total: Number(sale.total),
          metodoPago: sale.metodoPago,
          clienteNombre: sale.clienteNombre,
          clienteEmail: sale.clienteEmail,
          fechaRegistro: sale.fechaRegistro.toISOString(),
          usuario: sale.usuario,
          status_code: HttpStatus.OK,
        })),
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      };
    } catch (e) {
      console.log('Error in findPaginated:', e);
      throw new BadRequestException('Error finding paginated sales');
    }
  }
}