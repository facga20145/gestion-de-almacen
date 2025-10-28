import { Injectable, Inject } from '@nestjs/common';
import { SuppliersFindOneService } from 'src/modules/suppliers/domain/services/queries/suppliers-find-one.service';

@Injectable()
export class SuppliersFindOneUseCase {
  constructor(
    @Inject('SuppliersFindOneService') private readonly service: SuppliersFindOneService,
  ) {}

  async run(id: number): Promise<any> {
    return this.service.findOne(id);
  }
}