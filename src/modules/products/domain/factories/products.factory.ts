import { ProductsEntity } from '../entities/products.entity';

export class ProductsFactory {
  static createFromPrisma(data: any): ProductsEntity {
    return new ProductsEntity(
      data.id,
      data.nombre,
      data.descripcion,
      data.precio,
      data.stock,
      data.categoria,
      data.activo,
      data.fechaRegistro,
      data.updatedAt,
      data.createdAt,
      data.proveedorId,
    );
  }
}