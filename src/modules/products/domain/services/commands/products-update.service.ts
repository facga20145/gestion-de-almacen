import { Inject, Injectable } from '@nestjs/common';
import { IProductsUpdate } from '../../interfaces/products-update.interface';
import { ProductsUpdateRequestDto } from 'src/modules/products/application/dtos/products-update-request.dto';
import { ProductsUpdateResponseDto } from 'src/modules/products/application/dtos/products-update-response.dto';
import { ProductsRepositoryPort } from 'src/modules/products/infrastructure/adapters/ports/products-repository.port';

@Injectable()
export class ProductsUpdateService implements IProductsUpdate {
  constructor(
    @Inject('ProductsRepositoryPort')
    private readonly repo: ProductsRepositoryPort,
  ) {}

  update(id: number, data: ProductsUpdateRequestDto): Promise<ProductsUpdateResponseDto> {
    return this.repo.update(id, data);
  }
}