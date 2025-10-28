import { Injectable, Inject } from '@nestjs/common';
import { ProductsFindOneService } from 'src/modules/products/domain/services/queries/products-find-one.service';

@Injectable()
export class ProductsFindOneUseCase {
  constructor(
    @Inject('ProductsFindOneService') private readonly service: ProductsFindOneService,
  ) {}

  async run(id: number): Promise<any> {
    return this.service.findOne(id);
  }
}