import { SalesCreateRequestDto } from '../../../application/dtos/sales-create-request.dto';
import { SalesCreateResponseDto } from '../../../application/dtos/sales-create-response.dto';

export abstract class SalesRepositoryPort {
  abstract create(request: SalesCreateRequestDto, usuarioId: number): Promise<SalesCreateResponseDto>;
  abstract findOne(id: number): Promise<any>;
  abstract findPaginated(params: any): Promise<any>;
}