import { Injectable, Inject } from '@nestjs/common';
import { ProductsCreateRequestDto } from '../../dtos/products-create-request.dto';
import { ProductsCreateResponseDto } from '../../dtos/products-create-response.dto';
import { ProductsCreateService } from 'src/modules/products/domain/services/commands/products-create.service';

@Injectable()
export class ProductsCreateUseCase {
  constructor(
    @Inject('IProductsCreate') private readonly service: ProductsCreateService,
  ) {}

  async run(request: ProductsCreateRequestDto): Promise<ProductsCreateResponseDto> {
    return this.service.create(request);
  }
}