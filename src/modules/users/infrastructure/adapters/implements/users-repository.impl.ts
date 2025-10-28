import {
  Injectable,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { UsersRepositoryPort } from '../ports/users-repository.port';

import { UsersFindOneResponseDto } from 'src/modules/users/application/dtos/users-find-one-response.dto';
import { UsersFindOneService } from 'src/modules/users/domain/services/queries/users-find-one.service';

import { UsersUpdateStatusResponseDto } from 'src/modules/users/application/dtos/users-update-status-response.dto';
import { UsersUpdateStatusService } from 'src/modules/users/domain/services/commands/users-update-status.service';
import { UsersPaginatedRequestDto } from 'src/modules/users/application/dtos/users-paginated-request.dto';
import { UsersPaginatedResponseDto } from 'src/modules/users/application/dtos/users-paginated-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepositoryImpl implements UsersRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}


  async findOne(id: string): Promise<UsersFindOneResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        message: 'User found successfully',
        id: user.id,
        username: user.username,
        status: user.status,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt?.toISOString(),
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      console.log('Error in findOne:', e);

      if (e instanceof NotFoundException) {
        throw e;
      }

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2025':
            throw new NotFoundException('User not found');
          case 'P2023':
            throw new BadRequestException('Invalid user ID format');
          default:
            throw new BadRequestException('Database error occurred');
        }
      }

      throw new BadRequestException('Error finding user');
    }
  }

  async updateStatus(
    id: string,
    status: boolean,
  ): Promise<UsersUpdateStatusResponseDto> {
    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          status,
          updatedAt: new Date(),
        },
      });

      return {
        status_code: HttpStatus.OK,
        message: 'User status updated succesfully',
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P205') {
          throw new NotFoundException('User not found');
        }
      }
      throw new BadRequestException('Could not update user status');
    }
  }

  async findPaginated(
    params: UsersPaginatedRequestDto,
  ): Promise<UsersPaginatedResponseDto> {
    try {
      const page = Math.max(1, Number(params.index ?? 1));
      const limit = Math.max(1, Math.min(100, Number(params.limit ?? 10)));
      const skip = (page - 1) * limit;

      const where: Prisma.UserWhereInput = params.search
        ? {
            OR: [
              {
                username: {
                  contains: params.search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : {};

      const [items, totalItems] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            username: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        this.prisma.user.count({ where }),
      ]);

      return {
        items: items.map((user) => ({
          message: 'User found successfully',
          id: user.id,
          username: user.username,
          status: user.status,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt?.toISOString() || null,
          status_code: HttpStatus.OK,
        })),
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      };
    } catch (e) {
      console.log('Error in findPaginated:', e);

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2023':
            throw new BadRequestException('Invalid search parameters');
          default:
            throw new BadRequestException('Database error occurred');
        }
      }

      throw new BadRequestException('Error finding paginated users');
    }
  }
}
