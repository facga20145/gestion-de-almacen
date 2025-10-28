import { Inject, Injectable } from '@nestjs/common';
import { SuppliersCreateRequestDto } from 'src/modules/suppliers/application/dtos/suppliers-create-request.dto';
import { SuppliersCreateResponseDto } from 'src/modules/suppliers/application/dtos/suppliers-create-response.dto';
import { SuppliersRepositoryPort } from 'src/modules/suppliers/infrastructure/adapters/ports/suppliers-repository.port';

@Injectable()
export class SuppliersCreateService {
  constructor(
    @Inject('SuppliersRepositoryPort')
    private readonly repo: SuppliersRepositoryPort,
  ) {}

  create(data: SuppliersCreateRequestDto): Promise<SuppliersCreateResponseDto> {
    return this.repo.create(data);
  }
}