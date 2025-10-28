import { Injectable, Inject } from '@nestjs/common';
import { ProductsDeleteService } from 'src/modules/products/domain/services/commands/products-delete.service';

@Injectable()
export class ProductsDeleteUseCase {
  constructor(
    @Inject('ProductsDeleteService') private readonly service: ProductsDeleteService,
  ) {}

  async run(id: number): Promise<any> {
    return this.service.delete(id);
  }
}