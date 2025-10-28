import { Injectable, Inject } from '@nestjs/common';
import { SalesFindAllService } from 'src/modules/sales/domain/services/queries/sales-find-all.service';

@Injectable()
export class SalesFindAllUseCase {
  constructor(
    @Inject('SalesFindAllService') private readonly service: SalesFindAllService,
  ) {}

  async run(params: any): Promise<any> {
    return this.service.findPaginated(params);
  }
}