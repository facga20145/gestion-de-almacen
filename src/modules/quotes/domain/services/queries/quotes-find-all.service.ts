import { Inject, Injectable } from '@nestjs/common';
import { QuotesRepositoryPort } from 'src/modules/quotes/infrastructure/adapters/ports/quotes-repository.port';

@Injectable()
export class QuotesFindAllService {
  constructor(
    @Inject('QuotesRepositoryPort')
    private readonly repo: QuotesRepositoryPort,
  ) {}

  findPaginated(params: any): Promise<any> {
    return this.repo.findPaginated(params);
  }
}