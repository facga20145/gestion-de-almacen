import { LogEmailsEntity } from '../entities/log-emails.entity';

export class LogEmailsFactory {
  static createFromPrisma(data: any): LogEmailsEntity {
    return new LogEmailsEntity(
      data.id,
      data.emailDestino,
      data.asunto,
      data.fechaEnvio,
      data.estado,
      data.mensajeError,
      data.cotizacionId,
      data.usuarioId,
    );
  }
}