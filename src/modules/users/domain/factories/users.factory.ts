import { UsersEntity } from '../entities/users.entity';

export class UsersFactory {
  static createFromPrisma(data: any): UsersEntity {
    return new UsersEntity(
      data.id,
      data.nombre,
      data.email,
      data.contraseña,
      data.rol,
      data.activo,
      data.fechaRegistro,
      data.updatedAt,
      data.createdAt,
    );
  }
}
