import { Inject, Injectable } from '@nestjs/common';
import { LogEmailsRepositoryPort } from 'src/modules/log-emails/infrastructure/adapters/ports/log-emails-repository.port';

@Injectable()
export class LogEmailsFindOneService {
  constructor(
    @Inject('LogEmailsRepositoryPort')
    private readonly repo: LogEmailsRepositoryPort,
  ) {}

  findOne(id: number): Promise<any> {
    return this.repo.findOne(id);
  }
}