import {
  Injectable,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductsRepositoryPort } from '../ports/products-repository.port';
import { ProductsCreateRequestDto } from 'src/modules/products/application/dtos/products-create-request.dto';
import { ProductsCreateResponseDto } from 'src/modules/products/application/dtos/products-create-response.dto';
import { ProductsUpdateRequestDto } from 'src/modules/products/application/dtos/products-update-request.dto';
import { ProductsUpdateResponseDto } from 'src/modules/products/application/dtos/products-update-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsRepositoryImpl implements ProductsRepositoryPort {
  constructor(private readonly prisma: PrismaService) { }

  async create(request: ProductsCreateRequestDto): Promise<ProductsCreateResponseDto> {
    try {
      const product = await this.prisma.product.create({
        data: {
          nombre: request.nombre,
          descripcion: request.descripcion,
          precio: request.precio,
          stock: request.stock,
          categoria: request.categoria,
          proveedorId: request.proveedorId,
        },
        include: {
          proveedor: {
            select: {
              id: true,
              nombre: true,
            },
          },
        },
      });

      return {
        message: 'Product created successfully',
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: Number(product.precio),
        stock: product.stock,
        categoria: product.categoria,
        activo: product.activo,
        fechaRegistro: product.fechaRegistro.toISOString(),
        proveedorId: product.proveedorId,
        status_code: HttpStatus.CREATED,
      };
    } catch (e) {
      console.log('Error in create:', e);

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002':
            throw new ConflictException('Product name already exists');
          case 'P2003':
            throw new BadRequestException('Invalid supplier ID');
          default:
            throw new BadRequestException('Database error occurred');
        }
      }

      throw new BadRequestException('Error creating product');
    }
  }

  async update(id: number, request: ProductsUpdateRequestDto): Promise<ProductsUpdateResponseDto> {
    try {
      await this.prisma.product.update({
        where: { id },
        data: {
          ...(request.nombre && { nombre: request.nombre }),
          ...(request.descripcion !== undefined && { descripcion: request.descripcion }),
          ...(request.precio !== undefined && { precio: request.precio }),
          ...(request.stock !== undefined && { stock: request.stock }),
          ...(request.categoria !== undefined && { categoria: request.categoria }),
          ...(request.proveedorId !== undefined && { proveedorId: request.proveedorId }),
        },
      });

      return {
        message: 'Product updated successfully',
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2025':
            throw new NotFoundException('Product not found');
          case 'P2002':
            throw new ConflictException('Product name already exists');
          case 'P2003':
            throw new BadRequestException('Invalid supplier ID');
          default:
            throw new BadRequestException('Database error occurred');
        }
      }

      throw new BadRequestException('Error updating product');
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          proveedor: {
            select: {
              id: true,
              nombre: true,
              telefono: true,
              email: true,
            },
          },
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return {
        message: 'Product found successfully',
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: Number(product.precio),
        stock: product.stock,
        categoria: product.categoria,
        activo: product.activo,
        fechaRegistro: product.fechaRegistro.toISOString(),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        proveedorId: product.proveedorId,
        proveedor: product.proveedor,
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }

      throw new BadRequestException('Error finding product');
    }
  }

  async findPaginated(params: any): Promise<any> {
    try {
      const page = Math.max(1, Number(params.index ?? 1));
      const limit = Math.max(1, Math.min(100, Number(params.limit ?? 10)));
      const skip = (page - 1) * limit;

      const where: Prisma.ProductWhereInput = {
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
                categoria: {
                  contains: params.search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
          : {}),
      };

      const [items, totalItems] = await this.prisma.$transaction([
        this.prisma.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: { fechaRegistro: 'desc' },
          include: {
            proveedor: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        }),
        this.prisma.product.count({ where }),
      ]);

      return {
        items: items.map((product) => ({
          message: 'Product found successfully',
          id: product.id,
          nombre: product.nombre,
          descripcion: product.descripcion,
          precio: Number(product.precio),
          stock: product.stock,
          categoria: product.categoria,
          activo: product.activo,
          fechaRegistro: product.fechaRegistro.toISOString(),
          proveedorId: product.proveedorId,
          proveedor: product.proveedor,
          status_code: HttpStatus.OK,
        })),
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      };
    } catch (e) {
      console.log('Error in findPaginated:', e);
      throw new BadRequestException('Error finding paginated products');
    }
  }

  async delete(id: number): Promise<any> {
    try {
      await this.prisma.product.update({
        where: { id },
        data: { activo: false },
      });

      return {
        message: 'Product deleted successfully',
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Product not found');
        }
      }
      throw new BadRequestException('Error deleting product');
    }
  }
}