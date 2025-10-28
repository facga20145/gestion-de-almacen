import { Injectable, Inject } from '@nestjs/common';
import { QuotesFindAllService } from 'src/modules/quotes/domain/services/queries/quotes-find-all.service';

@Injectable()
export class QuotesFindAllUseCase {
  constructor(
    @Inject('QuotesFindAllService') private readonly service: QuotesFindAllService,
  ) {}

  async run(params: any): Promise<any> {
    return this.service.findPaginated(params);
  }
}