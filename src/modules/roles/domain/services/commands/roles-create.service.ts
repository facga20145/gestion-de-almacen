import { Inject, Injectable } from '@nestjs/common';
import { IRolesCreate } from '../../interfaces/roles-create.interface';
import { RolesRepositoryPort } from 'src/modules/roles/infrastructure/adapters/ports/roles-repository.port';
import { RolesCreateRequestDto } from 'src/modules/roles/application/dtos/roles-create-request.dto';
import { RolesCreateResponseDto } from 'src/modules/roles/application/dtos/roles-create-response.dto';
  
@Injectable()
export class RolesCreateService implements IRolesCreate {
  constructor(
    @Inject('RolesRepositoryPort')
    private readonly repo: RolesRepositoryPort,
  ) {}
  create(data: RolesCreateRequestDto): Promise<RolesCreateResponseDto> {
    return this.repo.create(data);
  }
}