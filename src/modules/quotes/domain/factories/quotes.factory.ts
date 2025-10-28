import { QuotesEntity } from '../entities/quotes.entity';

export class QuotesFactory {
  static createFromPrisma(data: any): QuotesEntity {
    return new QuotesEntity(
      data.id,
      data.codigo,
      data.clienteNombre,
      data.clienteEmail,
      data.fecha,
      data.total,
      data.estado,
      data.fechaRegistro,
      data.updatedAt,
      data.createdAt,
      data.usuarioId,
    );
  }
}