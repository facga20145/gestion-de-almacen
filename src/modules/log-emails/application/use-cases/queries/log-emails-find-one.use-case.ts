import { Injectable, Inject } from '@nestjs/common';
import { LogEmailsFindOneService } from 'src/modules/log-emails/domain/services/queries/log-emails-find-one.service';

@Injectable()
export class LogEmailsFindOneUseCase {
  constructor(
    @Inject('LogEmailsFindOneService') private readonly service: LogEmailsFindOneService,
  ) {}

  async run(id: number): Promise<any> {
    return this.service.findOne(id);
  }
}