import {
  Injectable,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SuppliersRepositoryPort } from '../ports/suppliers-repository.port';
import { SuppliersCreateRequestDto } from 'src/modules/suppliers/application/dtos/suppliers-create-request.dto';
import { SuppliersCreateResponseDto } from 'src/modules/suppliers/application/dtos/suppliers-create-response.dto';
import { SuppliersUpdateRequestDto } from 'src/modules/suppliers/application/dtos/suppliers-update-request.dto';
import { SuppliersUpdateResponseDto } from 'src/modules/suppliers/application/dtos/suppliers-update-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SuppliersRepositoryImpl implements SuppliersRepositoryPort {
  constructor(private readonly prisma: PrismaService) { }

  async create(request: SuppliersCreateRequestDto): Promise<SuppliersCreateResponseDto> {
    try {
      const supplier = await this.prisma.supplier.create({
        data: {
          nombre: request.nombre,
          telefono: request.telefono,
          email: request.email,
          direccion: request.direccion,
        },
      });

      return {
        message: 'Supplier created successfully',
        id: supplier.id,
        nombre: supplier.nombre,
        telefono: supplier.telefono,
        email: supplier.email,
        direccion: supplier.direccion,
        activo: supplier.activo,
        fechaRegistro: supplier.fechaRegistro.toISOString(),
        status_code: HttpStatus.CREATED,
      };
    } catch (e) {
      console.log('Error in create supplier:', e);

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002':
            throw new ConflictException('Supplier already exists');
          default:
            throw new BadRequestException('Database error occurred');
        }
      }

      throw new BadRequestException('Error creating supplier');
    }
  }

  async update(id: number, request: SuppliersUpdateRequestDto): Promise<SuppliersUpdateResponseDto> {
    try {
      await this.prisma.supplier.update({
        where: { id },
        data: {
          ...(request.nombre && { nombre: request.nombre }),
          ...(request.telefono !== undefined && { telefono: request.telefono }),
          ...(request.email !== undefined && { email: request.email }),
          ...(request.direccion !== undefined && { direccion: request.direccion }),
        },
      });

      return {
        message: 'Supplier updated successfully',
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2025':
            throw new NotFoundException('Supplier not found');
          case 'P2002':
            throw new ConflictException('Supplier already exists');
          default:
            throw new BadRequestException('Database error occurred');
        }
      }

      throw new BadRequestException('Error updating supplier');
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const supplier = await this.prisma.supplier.findUnique({
        where: { id },
        include: {
          productos: {
            select: {
              id: true,
              nombre: true,
              precio: true,
              stock: true,
              categoria: true,
            },
            take: 5, // Solo mostrar los primeros 5 productos
          },
        },
      });

      if (!supplier) {
        throw new NotFoundException('Supplier not found');
      }

      return {
        message: 'Supplier found successfully',
        id: supplier.id,
        nombre: supplier.nombre,
        telefono: supplier.telefono,
        email: supplier.email,
        direccion: supplier.direccion,
        activo: supplier.activo,
        fechaRegistro: supplier.fechaRegistro.toISOString(),
        createdAt: supplier.createdAt.toISOString(),
        updatedAt: supplier.updatedAt.toISOString(),
        productos: supplier.productos.map((p) => ({
          id: p.id,
          nombre: p.nombre,
          precio: Number(p.precio),
          stock: p.stock,
          categoria: p.categoria,
        })),
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }

      throw new BadRequestException('Error finding supplier');
    }
  }

  async findPaginated(params: any): Promise<any> {
    try {
      const page = Math.max(1, Number(params.index ?? 1));
      const limit = Math.max(1, Math.min(100, Number(params.limit ?? 10)));
      const skip = (page - 1) * limit;

      const where: Prisma.SupplierWhereInput = {
        activo: true,
        ...(params.search
          ? {
            OR: [
              {
                nombre: {
                  contains: params.search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                email: {
                  contains: params.search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
          : {}),
      };

      const [items, totalItems] = await this.prisma.$transaction([
        this.prisma.supplier.findMany({
          where,
          skip,
          take: limit,
          orderBy: { fechaRegistro: 'desc' },
        }),
        this.prisma.supplier.count({ where }),
      ]);

      return {
        items: items.map((supplier) => ({
          message: 'Supplier found successfully',
          id: supplier.id,
          nombre: supplier.nombre,
          telefono: supplier.telefono,
          email: supplier.email,
          direccion: supplier.direccion,
          activo: supplier.activo,
          fechaRegistro: supplier.fechaRegistro.toISOString(),
          status_code: HttpStatus.OK,
        })),
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      };
    } catch (e) {
      console.log('Error in findPaginated:', e);
      throw new BadRequestException('Error finding paginated suppliers');
    }
  }

  async delete(id: number): Promise<any> {
    try {
      // Verificar que el proveedor no tenga productos asociados
      const productCount = await this.prisma.product.count({
        where: { proveedorId: id, activo: true },
      });

      if (productCount > 0) {
        throw new BadRequestException(
          `Cannot delete supplier. There are ${productCount} active products associated with this supplier.`
        );
      }

      await this.prisma.supplier.update({
        where: { id },
        data: { activo: false },
      });

      return {
        message: 'Supplier deleted successfully',
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Supplier not found');
        }
      }

      throw new BadRequestException('Error deleting supplier');
    }
  }
}