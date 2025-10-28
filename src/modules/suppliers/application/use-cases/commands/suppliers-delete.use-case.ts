import { Injectable, Inject } from '@nestjs/common';
import { SuppliersDeleteService } from 'src/modules/suppliers/domain/services/commands/suppliers-delete.service';

@Injectable()
export class SuppliersDeleteUseCase {
  constructor(
    @Inject('SuppliersDeleteService') private readonly service: SuppliersDeleteService,
  ) {}

  async run(id: number): Promise<any> {
    return this.service.delete(id);
  }
}