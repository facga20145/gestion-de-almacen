import { Injectable, Inject } from '@nestjs/common';
import { LogEmailsFindAllService } from 'src/modules/log-emails/domain/services/queries/log-emails-find-all.service';

@Injectable()
export class LogEmailsFindAllUseCase {
  constructor(
    @Inject('LogEmailsFindAllService') private readonly service: LogEmailsFindAllService,
  ) {}

  async run(params: any): Promise<any> {
    return this.service.findPaginated(params);
  }
}