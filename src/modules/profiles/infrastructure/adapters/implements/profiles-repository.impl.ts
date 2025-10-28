import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ProfilesCreateRequestDto } from 'src/modules/profiles/application/dtos/profiles-create-request.dto';
import { ProfilesCreateResponseDto } from 'src/modules/profiles/application/dtos/profiles-create-response.dto';
import { ProfilesUpdateRequestDto } from 'src/modules/profiles/application/dtos/profiles-update-request.dto';
import { ProfilesUpdateResponseDto } from 'src/modules/profiles/application/dtos/profiles-update-response.dto';
import { ProfilesPaginatedResponseDto } from 'src/modules/profiles/application/dtos/profiles-paginated-response.dto';
import { ProfilesRepositoryPort } from '../ports/profiles-repository.port';

@Injectable()
export class ProfilesRepositoryImpl implements ProfilesRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(request: ProfilesCreateRequestDto): Promise<ProfilesCreateResponseDto> {
    const profile = await this.prisma.profile.create({
      data: {
        name: request.name,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        address: request.address,
        gender: request.gender,
        photo: request.photo,
        birthDate: request.birthDate,
        status: true,
        userId: request.userId,
      },
    });
    return {
      id: profile.id,
      name: profile.name,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone || undefined,
      address: profile.address || undefined,
      gender: profile.gender || undefined,
      photo: profile.photo || undefined,
      birthDate: profile.birthDate || undefined,
      status: profile.status,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt || undefined,
      userId: profile.userId,
    };
  }

  async findOne(id: string): Promise<ProfilesCreateResponseDto> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    return {
      id: profile.id,
      name: profile.name,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone || undefined,
      address: profile.address || undefined,
      gender: profile.gender || undefined,
      photo: profile.photo || undefined,
      birthDate: profile.birthDate || undefined,
      status: profile.status,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt || undefined,
      userId: profile.userId,
    };
  }

  async findAll(): Promise<ProfilesCreateResponseDto[]> {
    const profiles = await this.prisma.profile.findMany();
    return profiles.map(profile => ({
      id: profile.id,
      name: profile.name,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone || undefined,
      address: profile.address || undefined,
      gender: profile.gender || undefined,
      photo: profile.photo || undefined,
      birthDate: profile.birthDate || undefined,
      status: profile.status,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt || undefined,
      userId: profile.userId,
    }));
  }

  async findPaginated(params: { index: number; limit: number; search?: string }): Promise<ProfilesPaginatedResponseDto> {
    const { index, limit, search } = params;
    
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { lastName: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {};

    const [items, totalItems] = await Promise.all([
      this.prisma.profile.findMany({
        where,
        skip: (index - 1) * limit,
        take: limit,
      }),
      this.prisma.profile.count({ where }),
    ]);
    
    const totalPages = Math.ceil(totalItems / limit);
    
    return {
      items: items.map(profile => ({
        id: profile.id,
        name: profile.name,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone || undefined,
        address: profile.address || undefined,
        gender: profile.gender || undefined,
        photo: profile.photo || undefined,
        birthDate: profile.birthDate || undefined,
        status: profile.status,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt || undefined,
        userId: profile.userId,
      })),
      currentPage: index,
      totalPages,
      totalItems,
    };
  }

  async update(id: string, request: ProfilesUpdateRequestDto): Promise<ProfilesUpdateResponseDto> {
    const profile = await this.prisma.profile.update({
      where: { id },
      data: {
        ...request,
      },
    });
    return {
      id: profile.id,
      name: profile.name,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone || undefined,
      address: profile.address || undefined,
      gender: profile.gender || undefined,
      photo: profile.photo || undefined,
      birthDate: profile.birthDate || undefined,
      status: profile.status,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt || undefined,
      userId: profile.userId,
    };
  }

  async updateStatus(id: string, status: boolean): Promise<ProfilesUpdateResponseDto> {
    const profile = await this.prisma.profile.update({
      where: { id },
      data: { status },
    });
    return {
      id: profile.id,
      name: profile.name,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone || undefined,
      address: profile.address || undefined,
      gender: profile.gender || undefined,
      photo: profile.photo || undefined,
      birthDate: profile.birthDate || undefined,
      status: profile.status,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt || undefined,
      userId: profile.userId,
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.profile.delete({
      where: { id },
    });
  }
}