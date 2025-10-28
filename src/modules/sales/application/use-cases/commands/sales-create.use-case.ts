import { Injectable, Inject } from '@nestjs/common';
import { SalesCreateRequestDto } from '../../dtos/sales-create-request.dto';
import { SalesCreateResponseDto } from '../../dtos/sales-create-response.dto';
import { SalesCreateService } from 'src/modules/sales/domain/services/commands/sales-create.service';

@Injectable()
export class SalesCreateUseCase {
  constructor(
    @Inject('SalesCreateService') private readonly service: SalesCreateService,
  ) {}

  async run(request: SalesCreateRequestDto, usuarioId: number): Promise<SalesCreateResponseDto> {
    return this.service.create(request, usuarioId);
  }
}