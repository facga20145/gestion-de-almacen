import { Injectable, Inject } from '@nestjs/common';
import { QuotesUpdateRequestDto } from '../../dtos/quotes-update-request.dto';
import { QuotesUpdateResponseDto } from '../../dtos/quotes-update-response.dto';
import { QuotesUpdateService } from 'src/modules/quotes/domain/services/commands/quotes-update.service';

@Injectable()
export class QuotesUpdateUseCase {
  constructor(
    @Inject('QuotesUpdateService') private readonly service: QuotesUpdateService,
  ) {}

  async run(id: number, request: QuotesUpdateRequestDto): Promise<QuotesUpdateResponseDto> {
    return this.service.update(id, request);
  }
}