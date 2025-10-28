import { SuppliersCreateRequestDto } from '../../../application/dtos/suppliers-create-request.dto';
import { SuppliersCreateResponseDto } from '../../../application/dtos/suppliers-create-response.dto';
import { SuppliersUpdateRequestDto } from '../../../application/dtos/suppliers-update-request.dto';
import { SuppliersUpdateResponseDto } from '../../../application/dtos/suppliers-update-response.dto';

export abstract class SuppliersRepositoryPort {
  abstract create(request: SuppliersCreateRequestDto): Promise<SuppliersCreateResponseDto>;
  abstract update(id: number, request: SuppliersUpdateRequestDto): Promise<SuppliersUpdateResponseDto>;
  abstract findOne(id: number): Promise<any>;
  abstract findPaginated(params: any): Promise<any>;
  abstract delete(id: number): Promise<any>;
}