import { ProductsCreateRequestDto } from '../../../application/dtos/products-create-request.dto';
import { ProductsCreateResponseDto } from '../../../application/dtos/products-create-response.dto';
import { ProductsUpdateRequestDto } from '../../../application/dtos/products-update-request.dto';
import { ProductsUpdateResponseDto } from '../../../application/dtos/products-update-response.dto';

export abstract class ProductsRepositoryPort {
  abstract create(request: ProductsCreateRequestDto): Promise<ProductsCreateResponseDto>;
  abstract update(id: number, request: ProductsUpdateRequestDto): Promise<ProductsUpdateResponseDto>;
  abstract findOne(id: number): Promise<any>;
  abstract findPaginated(params: any): Promise<any>;
  abstract delete(id: number): Promise<any>;
}