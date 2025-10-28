import { Inject, Injectable } from '@nestjs/common';
import { SuppliersRepositoryPort } from 'src/modules/suppliers/infrastructure/adapters/ports/suppliers-repository.port';

@Injectable()
export class SuppliersDeleteService {
  constructor(
    @Inject('SuppliersRepositoryPort')
    private readonly repo: SuppliersRepositoryPort,
  ) {}

  delete(id: number): Promise<any> {
    return this.repo.delete(id);
  }
}