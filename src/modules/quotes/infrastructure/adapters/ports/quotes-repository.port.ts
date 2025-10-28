import { QuotesCreateRequestDto } from '../../../application/dtos/quotes-create-request.dto';
import { QuotesCreateResponseDto } from '../../../application/dtos/quotes-create-response.dto';
import { QuotesUpdateRequestDto } from '../../../application/dtos/quotes-update-request.dto';
import { QuotesUpdateResponseDto } from '../../../application/dtos/quotes-update-response.dto';

export abstract class QuotesRepositoryPort {
  abstract create(request: QuotesCreateRequestDto, usuarioId: number): Promise<QuotesCreateResponseDto>;
  abstract update(id: number, request: QuotesUpdateRequestDto): Promise<QuotesUpdateResponseDto>;
  abstract findOne(id: number): Promise<any>;
  abstract findPaginated(params: any): Promise<any>;
  abstract delete(id: number): Promise<any>;
}