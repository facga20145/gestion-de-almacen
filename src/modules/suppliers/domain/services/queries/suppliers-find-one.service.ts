import { Inject, Injectable } from '@nestjs/common';
import { SuppliersRepositoryPort } from 'src/modules/suppliers/infrastructure/adapters/ports/suppliers-repository.port';

@Injectable()
export class SuppliersFindOneService {
  constructor(
    @Inject('SuppliersRepositoryPort')
    private readonly repo: SuppliersRepositoryPort,
  ) {}

  findOne(id: number): Promise<any> {
    return this.repo.findOne(id);
  }
}