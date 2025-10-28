import { Inject, Injectable } from '@nestjs/common';
import { SalesCreateRequestDto } from 'src/modules/sales/application/dtos/sales-create-request.dto';
import { SalesCreateResponseDto } from 'src/modules/sales/application/dtos/sales-create-response.dto';
import { SalesRepositoryPort } from 'src/modules/sales/infrastructure/adapters/ports/sales-repository.port';

@Injectable()
export class SalesCreateService {
  constructor(
    @Inject('SalesRepositoryPort')
    private readonly repo: SalesRepositoryPort,
  ) {}

  create(data: SalesCreateRequestDto, usuarioId: number): Promise<SalesCreateResponseDto> {
    return this.repo.create(data, usuarioId);
  }
}