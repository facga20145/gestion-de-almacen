import { Injectable, Inject } from '@nestjs/common';
import { SuppliersUpdateRequestDto } from '../../dtos/suppliers-update-request.dto';
import { SuppliersUpdateResponseDto } from '../../dtos/suppliers-update-response.dto';
import { SuppliersUpdateService } from 'src/modules/suppliers/domain/services/commands/suppliers-update.service';

@Injectable()
export class SuppliersUpdateUseCase {
  constructor(
    @Inject('ISuppliersUpdate') private readonly service: SuppliersUpdateService,
  ) {}

  async run(id: number, request: SuppliersUpdateRequestDto): Promise<SuppliersUpdateResponseDto> {
    return this.service.update(id, request);
  }
}