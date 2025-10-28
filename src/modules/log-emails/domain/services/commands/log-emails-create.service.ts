import { Inject, Injectable } from '@nestjs/common';
import { LogEmailsCreateRequestDto } from 'src/modules/log-emails/application/dtos/log-emails-create-request.dto';
import { LogEmailsCreateResponseDto } from 'src/modules/log-emails/application/dtos/log-emails-create-response.dto';
import { LogEmailsRepositoryPort } from 'src/modules/log-emails/infrastructure/adapters/ports/log-emails-repository.port';

@Injectable()
export class LogEmailsCreateService {
  constructor(
    @Inject('LogEmailsRepositoryPort')
    private readonly repo: LogEmailsRepositoryPort,
  ) {}

  create(data: LogEmailsCreateRequestDto, estado: 'ENVIADO' | 'ERROR', mensajeError?: string): Promise<LogEmailsCreateResponseDto> {
    return this.repo.create(data, estado, mensajeError);
  }
}