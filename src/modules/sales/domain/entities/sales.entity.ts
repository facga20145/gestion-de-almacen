import { MetodoPago } from '@prisma/client';

export class SalesEntity {
  constructor(
    public id: number,
    public fecha: Date,
    public total: number,
    public metodoPago: MetodoPago,
    public clienteNombre: string,
    public clienteEmail: string | null,
    public clienteTelefono: string | null,
    public cotizacionId: number | null,
    public fechaRegistro: Date,
    public updatedAt: Date,
    public createdAt: Date,
    public usuarioId: number,
  ) {}
}