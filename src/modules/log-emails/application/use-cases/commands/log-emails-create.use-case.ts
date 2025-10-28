import { Injectable, Inject } from '@nestjs/common';
import { LogEmailsCreateRequestDto } from '../../dtos/log-emails-create-request.dto';
import { LogEmailsCreateResponseDto } from '../../dtos/log-emails-create-response.dto';
import { LogEmailsCreateService } from 'src/modules/log-emails/domain/services/commands/log-emails-create.service';

@Injectable()
export class LogEmailsCreateUseCase {
  constructor(
    @Inject('LogEmailsCreateService') private readonly service: LogEmailsCreateService,
  ) {}

  async run(request: LogEmailsCreateRequestDto, estado: 'ENVIADO' | 'ERROR', mensajeError?: string): Promise<LogEmailsCreateResponseDto> {
    return this.service.create(request, estado, mensajeError);
  }
}