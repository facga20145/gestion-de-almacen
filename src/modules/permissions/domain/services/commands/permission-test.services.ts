// src/application/services/permissions-test.service.ts
import { Injectable } from '@nestjs/common';
import { PermissionRepository } from 'src/modules/permissions/infrastructure/adapters/implements/permissions-repository.impl';
import { PermissionsCreateDto } from 'src/modules/permissions/application/dtos/permissions-create.dto';

@Injectable()
export class PermissionsTestService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  // Método para crear un permiso
  async createPermission() {
    const createDto: PermissionsCreateDto = {
      name: 'Test Permission',
      flag: 'test_flag',
      status: true,
    };
    return this.permissionRepository.create(createDto);
  }

  // Método para obtener todos los permisos
  async getPermissions() {
    return this.permissionRepository.findAll(1, 10); // Obtener la primera página con un límite de 10
  }

  // Método para probar la actualización de un permiso
  async updatePermission(id: string) {
    const updateData = { status: false };
    return this.permissionRepository.update(id, updateData);
  }
}
