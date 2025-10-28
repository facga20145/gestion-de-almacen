import { Injectable } from '@nestjs/common';
import { PermissionRepository } from 'src/modules/permissions/infrastructure/adapters/implements/permissions-repository.impl';
import { PermissionsCreateDto } from 'src/modules/permissions/application/dtos/permissions-create.dto';

@Injectable()
export class PermissionsCreateService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(createDto: PermissionsCreateDto) {
    return this.permissionRepository.create(createDto);
  }
}
