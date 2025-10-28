// src/infrastructure/adapters/permissions.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PermissionsCreateDto } from 'src/modules/permissions/application/dtos/permissions-create.dto';
import { PermissionsRepositoryPort } from '../ports/permissions-repository.port';

@Injectable()
export class PermissionRepository implements PermissionsRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: PermissionsCreateDto) {
    return this.prisma.permission.create({
      data: {
        name: createDto.name,
        flag: createDto.flag,
        status: createDto.status,
      },
    });
  }

  async findAll(page: number, limit: number) {
    return this.prisma.permission.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async update(id: string, updateDto: Partial<PermissionsCreateDto>) {
    return this.prisma.permission.update({
      where: { id },
      data: updateDto,
    });
  }

  async findById(id: string) {
    return this.prisma.permission.findUnique({
      where: { id },
    });
  }
}
