import { Injectable, Inject } from '@nestjs/common';
import { SuppliersFindAllService } from 'src/modules/suppliers/domain/services/queries/suppliers-find-all.service';

@Injectable()
export class SuppliersFindAllUseCase {
  constructor(
    @Inject('SuppliersFindAllService') private readonly service: SuppliersFindAllService,
  ) {}

  async run(params: any): Promise<any> {
    return this.service.findPaginated(params);
  }
}