import { Injectable, Inject } from '@nestjs/common';
import { SuppliersCreateRequestDto } from '../../dtos/suppliers-create-request.dto';
import { SuppliersCreateResponseDto } from '../../dtos/suppliers-create-response.dto';
import { SuppliersCreateService } from 'src/modules/suppliers/domain/services/commands/suppliers-create.service';

@Injectable()
export class SuppliersCreateUseCase {
  constructor(
    @Inject('ISuppliersCreate') private readonly service: SuppliersCreateService,
  ) {}

  async run(request: SuppliersCreateRequestDto): Promise<SuppliersCreateResponseDto> {
    return this.service.create(request);
  }
}