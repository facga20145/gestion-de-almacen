import { Injectable, Inject } from '@nestjs/common';
import { QuotesFindOneService } from 'src/modules/quotes/domain/services/queries/quotes-find-one.service';

@Injectable()
export class QuotesFindOneUseCase {
  constructor(
    @Inject('QuotesFindOneService') private readonly service: QuotesFindOneService,
  ) {}

  async run(id: number): Promise<any> {
    return this.service.findOne(id);
  }
}