import { Injectable, Inject } from '@nestjs/common';
import { ProductsFindAllService } from 'src/modules/products/domain/services/queries/products-find-all.service';

@Injectable()
export class ProductsFindAllUseCase {
  constructor(
    @Inject('ProductsFindAllService') private readonly service: ProductsFindAllService,
  ) {}

  async run(params: any): Promise<any> {
    return this.service.findPaginated(params);
  }
}