import { Inject, Injectable } from '@nestjs/common';
import { LogEmailsRepositoryPort } from 'src/modules/log-emails/infrastructure/adapters/ports/log-emails-repository.port';

@Injectable()
export class LogEmailsFindAllService {
  constructor(
    @Inject('LogEmailsRepositoryPort')
    private readonly repo: LogEmailsRepositoryPort,
  ) {}

  findPaginated(params: any): Promise<any> {
    return this.repo.findPaginated(params);
  }
}