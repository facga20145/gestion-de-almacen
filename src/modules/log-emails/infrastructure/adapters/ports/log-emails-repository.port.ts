import { LogEmailsCreateRequestDto } from '../../../application/dtos/log-emails-create-request.dto';
import { LogEmailsCreateResponseDto } from '../../../application/dtos/log-emails-create-response.dto';

export abstract class LogEmailsRepositoryPort {
  abstract create(request: LogEmailsCreateRequestDto, estado: 'ENVIADO' | 'ERROR', mensajeError?: string): Promise<LogEmailsCreateResponseDto>;
  abstract findOne(id: number): Promise<any>;
  abstract findPaginated(params: any): Promise<any>;
}