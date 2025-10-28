import { EstadoEmail } from '@prisma/client';

export class LogEmailsEntity {
  constructor(
    public id: number,
    public emailDestino: string,
    public asunto: string,
    public fechaEnvio: Date,
    public estado: EstadoEmail,
    public mensajeError: string | null,
    public cotizacionId: number | null,
    public usuarioId: number | null,
  ) {}
}