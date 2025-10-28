import { EstadoCotizacion } from '@prisma/client';

export class QuotesEntity {
  constructor(
    public id: number,
    public codigo: string,
    public clienteNombre: string,
    public clienteEmail: string,
    public fecha: Date,
    public total: number,
    public estado: EstadoCotizacion,
    public fechaRegistro: Date,
    public updatedAt: Date,
    public createdAt: Date,
    public usuarioId: number,
  ) {}
}