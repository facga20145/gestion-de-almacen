import { Injectable, Inject } from '@nestjs/common';
import { ProductsUpdateRequestDto } from '../../dtos/products-update-request.dto';
import { ProductsUpdateResponseDto } from '../../dtos/products-update-response.dto';
import { ProductsUpdateService } from 'src/modules/products/domain/services/commands/products-update.service';

@Injectable()
export class ProductsUpdateUseCase {
  constructor(
    @Inject('IProductsUpdate') private readonly service: ProductsUpdateService,
  ) {}

  async run(id: number, request: ProductsUpdateRequestDto): Promise<ProductsUpdateResponseDto> {
    return this.service.update(id, request);
  }
}