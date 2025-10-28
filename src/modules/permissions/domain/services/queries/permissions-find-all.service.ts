// src/application/services/permissions-find-all.service.ts
import { Injectable } from '@nestjs/common';
import { PermissionRepository } from 'src/modules/permissions/infrastructure/adapters/implements/permissions-repository.impl';

@Injectable()
export class PermissionsFindAllService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async findAll(page: number, limit: number) {
    return this.permissionRepository.findAll(page, limit);
  }
}
