import { Injectable, Inject } from '@nestjs/common';
import { QuotesDeleteService } from 'src/modules/quotes/domain/services/commands/quotes-delete.service';

@Injectable()
export class QuotesDeleteUseCase {
  constructor(
    @Inject('QuotesDeleteService') private readonly service: QuotesDeleteService,
  ) {}

  async run(id: number): Promise<any> {
    return this.service.delete(id);
  }
}