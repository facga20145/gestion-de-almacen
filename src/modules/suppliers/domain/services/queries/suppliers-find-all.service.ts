import { Inject, Injectable } from '@nestjs/common';
import { SuppliersRepositoryPort } from 'src/modules/suppliers/infrastructure/adapters/ports/suppliers-repository.port';

@Injectable()
export class SuppliersFindAllService {
  constructor(
    @Inject('SuppliersRepositoryPort')
    private readonly repo: SuppliersRepositoryPort,
  ) {}

  findPaginated(params: any): Promise<any> {
    return this.repo.findPaginated(params);
  }
}