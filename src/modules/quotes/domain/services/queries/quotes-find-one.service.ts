import { Inject, Injectable } from '@nestjs/common';
import { QuotesRepositoryPort } from 'src/modules/quotes/infrastructure/adapters/ports/quotes-repository.port';

@Injectable()
export class QuotesFindOneService {
  constructor(
    @Inject('QuotesRepositoryPort')
    private readonly repo: QuotesRepositoryPort,
  ) {}

  findOne(id: number): Promise<any> {
    return this.repo.findOne(id);
  }
}