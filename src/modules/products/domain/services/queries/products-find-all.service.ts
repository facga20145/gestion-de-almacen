import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepositoryPort } from 'src/modules/products/infrastructure/adapters/ports/products-repository.port';

@Injectable()
export class ProductsFindAllService {
  constructor(
    @Inject('ProductsRepositoryPort')
    private readonly repo: ProductsRepositoryPort,
  ) {}

  findPaginated(params: any): Promise<any> {
    return this.repo.findPaginated(params);
  }
}