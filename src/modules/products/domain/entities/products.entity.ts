import { RolUsuario } from '@prisma/client';

export class ProductsEntity {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string | null,
    public precio: number,
    public stock: number,
    public categoria: string | null,
    public activo: boolean,
    public fechaRegistro: Date,
    public updatedAt: Date,
    public createdAt: Date,
    public proveedorId: number,
  ) {}
}