import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepositoryPort } from 'src/modules/products/infrastructure/adapters/ports/products-repository.port';

@Injectable()
export class ProductsFindOneService {
  constructor(
    @Inject('ProductsRepositoryPort')
    private readonly repo: ProductsRepositoryPort,
  ) {}

  findOne(id: number): Promise<any> {
    return this.repo.findOne(id);
  }
}