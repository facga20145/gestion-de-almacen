import { ProductsUpdateRequestDto } from '../../application/dtos/products-update-request.dto';
import { ProductsUpdateResponseDto } from '../../application/dtos/products-update-response.dto';

export interface IProductsUpdate {
  update(id: number, request: ProductsUpdateRequestDto): Promise<ProductsUpdateResponseDto>;
}