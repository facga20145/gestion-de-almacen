import { RolUsuario } from '@prisma/client';

export class AuthEntity {
  constructor(
    public id: number,
    public nombre: string,
    public email: string,
    public contraseña: string,
    public rol: RolUsuario,
    public activo: boolean,
    public fechaRegistro: Date,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}