import { Inject, Injectable } from '@nestjs/common';
import { SuppliersUpdateRequestDto } from 'src/modules/suppliers/application/dtos/suppliers-update-request.dto';
import { SuppliersUpdateResponseDto } from 'src/modules/suppliers/application/dtos/suppliers-update-response.dto';
import { SuppliersRepositoryPort } from 'src/modules/suppliers/infrastructure/adapters/ports/suppliers-repository.port';

@Injectable()
export class SuppliersUpdateService {
  constructor(
    @Inject('SuppliersRepositoryPort')
    private readonly repo: SuppliersRepositoryPort,
  ) {}

  update(id: number, data: SuppliersUpdateRequestDto): Promise<SuppliersUpdateResponseDto> {
    return this.repo.update(id, data);
  }
}