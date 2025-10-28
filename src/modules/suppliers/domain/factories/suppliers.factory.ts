import { SuppliersEntity } from '../entities/suppliers.entity';

export class SuppliersFactory {
  static createFromPrisma(data: any): SuppliersEntity {
    return new SuppliersEntity(
      data.id,
      data.nombre,
      data.telefono,
      data.email,
      data.direccion,
      data.activo,
      data.fechaRegistro,
      data.updatedAt,
      data.createdAt,
    );
  }
}