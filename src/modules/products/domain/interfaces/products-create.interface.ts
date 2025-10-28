import { ProductsCreateRequestDto } from '../../application/dtos/products-create-request.dto';
import { ProductsCreateResponseDto } from '../../application/dtos/products-create-response.dto';

export interface IProductsCreate {
  create(request: ProductsCreateRequestDto): Promise<ProductsCreateResponseDto>;
}