import { Inject, Injectable } from '@nestjs/common';
import { RolesCreateService } from 'src/modules/roles/domain/services/commands/roles-create.service';
import { RolesCreateRequestDto } from '../../dtos/roles-create-request.dto';
import { RolesCreateResponseDto } from '../../dtos/roles-create-response.dto';
  
@Injectable()
export class RolesCreateUseCase {
  constructor(@Inject('ICreateRole') private service: RolesCreateService) {}

  async run(request: RolesCreateRequestDto): Promise<RolesCreateResponseDto> {
    return this.service.create(request);
  }
}