import { HttpStatus, Injectable } from '@nestjs/common';
import { RolesRepositoryPort } from '../ports/roles-repository.port';
import { PrismaService } from 'prisma/prisma.service';
import { RolesCreateRequestDto } from 'src/modules/roles/application/dtos/roles-create-request.dto';
import { RolesCreateResponseDto } from 'src/modules/roles/application/dtos/roles-create-response.dto';
  
@Injectable()
export class RolesRepositoryImpl implements RolesRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async create(data: RolesCreateRequestDto): Promise<RolesCreateResponseDto> {
    await this.prisma.role.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: null,
      },
    });

    return {
      message: 'Rol registrado exitosamente',
    };
  }
}