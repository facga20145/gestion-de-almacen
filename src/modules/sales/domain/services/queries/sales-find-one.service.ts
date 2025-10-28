import { Inject, Injectable } from '@nestjs/common';
import { SalesRepositoryPort } from 'src/modules/sales/infrastructure/adapters/ports/sales-repository.port';

@Injectable()
export class SalesFindOneService {
  constructor(
    @Inject('SalesRepositoryPort')
    private readonly repo: SalesRepositoryPort,
  ) {}

  findOne(id: number): Promise<any> {
    return this.repo.findOne(id);
  }
}