import { SalesEntity } from '../entities/sales.entity';

export class SalesFactory {
  static createFromPrisma(data: any): SalesEntity {
    return new SalesEntity(
      data.id,
      data.fecha,
      data.total,
      data.metodoPago,
      data.clienteNombre,
      data.clienteEmail,
      data.clienteTelefono,
      data.cotizacionId,
      data.fechaRegistro,
      data.updatedAt,
      data.createdAt,
      data.usuarioId,
    );
  }
}