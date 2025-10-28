import { Inject, Injectable } from '@nestjs/common';
import { QuotesRepositoryPort } from 'src/modules/quotes/infrastructure/adapters/ports/quotes-repository.port';

@Injectable()
export class QuotesDeleteService {
  constructor(
    @Inject('QuotesRepositoryPort')
    private readonly repo: QuotesRepositoryPort,
  ) {}

  delete(id: number): Promise<any> {
    return this.repo.delete(id);
  }
}