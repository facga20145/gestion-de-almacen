import { Inject, Injectable } from '@nestjs/common';
import { SalesRepositoryPort } from 'src/modules/sales/infrastructure/adapters/ports/sales-repository.port';

@Injectable()
export class SalesFindAllService {
  constructor(
    @Inject('SalesRepositoryPort')
    private readonly repo: SalesRepositoryPort,
  ) {}

  findPaginated(params: any): Promise<any> {
    return this.repo.findPaginated(params);
  }
}