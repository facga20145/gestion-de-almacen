import { Inject, Injectable } from '@nestjs/common';
import { IProductsCreate } from '../../interfaces/products-create.interface';
import { ProductsCreateRequestDto } from 'src/modules/products/application/dtos/products-create-request.dto';
import { ProductsCreateResponseDto } from 'src/modules/products/application/dtos/products-create-response.dto';
import { ProductsRepositoryPort } from 'src/modules/products/infrastructure/adapters/ports/products-repository.port';

@Injectable()
export class ProductsCreateService implements IProductsCreate {
  constructor(
    @Inject('ProductsRepositoryPort')
    private readonly repo: ProductsRepositoryPort,
  ) {}

  create(data: ProductsCreateRequestDto): Promise<ProductsCreateResponseDto> {
    return this.repo.create(data);
  }
}