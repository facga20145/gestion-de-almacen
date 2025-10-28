import { Inject, Injectable } from '@nestjs/common';
import { QuotesCreateRequestDto } from 'src/modules/quotes/application/dtos/quotes-create-request.dto';
import { QuotesCreateResponseDto } from 'src/modules/quotes/application/dtos/quotes-create-response.dto';
import { QuotesRepositoryPort } from 'src/modules/quotes/infrastructure/adapters/ports/quotes-repository.port';

@Injectable()
export class QuotesCreateService {
  constructor(
    @Inject('QuotesRepositoryPort')
    private readonly repo: QuotesRepositoryPort,
  ) {}

  create(data: QuotesCreateRequestDto, usuarioId: number): Promise<QuotesCreateResponseDto> {
    return this.repo.create(data, usuarioId);
  }
}