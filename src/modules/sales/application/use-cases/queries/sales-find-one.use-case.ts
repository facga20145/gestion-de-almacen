import { Injectable, Inject } from '@nestjs/common';
import { SalesFindOneService } from 'src/modules/sales/domain/services/queries/sales-find-one.service';

@Injectable()
export class SalesFindOneUseCase {
  constructor(
    @Inject('SalesFindOneService') private readonly service: SalesFindOneService,
  ) {}

  async run(id: number): Promise<any> {
    return this.service.findOne(id);
  }
}