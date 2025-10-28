import { AuthEntity } from '../entities/auth.entity';
import { RolUsuario } from '@prisma/client';

export class AuthFactory {
  static createFromPrisma(data: any): AuthEntity {
    return new AuthEntity(
      data.id,
      data.nombre,
      data.email,
      data.contraseña,
      data.rol,
      data.activo,
      data.fechaRegistro,
      data.createdAt,
      data.updatedAt,
    );
  }
}
