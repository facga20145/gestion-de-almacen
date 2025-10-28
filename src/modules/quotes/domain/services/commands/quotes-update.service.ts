import { Inject, Injectable } from '@nestjs/common';
import { QuotesUpdateRequestDto } from 'src/modules/quotes/application/dtos/quotes-update-request.dto';
import { QuotesUpdateResponseDto } from 'src/modules/quotes/application/dtos/quotes-update-response.dto';
import { QuotesRepositoryPort } from 'src/modules/quotes/infrastructure/adapters/ports/quotes-repository.port';

@Injectable()
export class QuotesUpdateService {
  constructor(
    @Inject('QuotesRepositoryPort')
    private readonly repo: QuotesRepositoryPort,
  ) {}

  update(id: number, data: QuotesUpdateRequestDto): Promise<QuotesUpdateResponseDto> {
    return this.repo.update(id, data);
  }
}