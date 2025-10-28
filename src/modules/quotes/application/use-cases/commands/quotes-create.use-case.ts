import { Injectable, Inject } from '@nestjs/common';
import { QuotesCreateRequestDto } from '../../dtos/quotes-create-request.dto';
import { QuotesCreateResponseDto } from '../../dtos/quotes-create-response.dto';
import { QuotesCreateService } from 'src/modules/quotes/domain/services/commands/quotes-create.service';

@Injectable()
export class QuotesCreateUseCase {
  constructor(
    @Inject('QuotesCreateService') private readonly service: QuotesCreateService,
  ) {}

  async run(request: QuotesCreateRequestDto, usuarioId: number): Promise<QuotesCreateResponseDto> {
    return this.service.create(request, usuarioId);
  }
}