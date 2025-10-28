import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepositoryPort } from 'src/modules/products/infrastructure/adapters/ports/products-repository.port';

@Injectable()
export class ProductsDeleteService {
  constructor(
    @Inject('ProductsRepositoryPort')
    private readonly repo: ProductsRepositoryPort,
  ) {}

  delete(id: number): Promise<any> {
    return this.repo.delete(id);
  }
}