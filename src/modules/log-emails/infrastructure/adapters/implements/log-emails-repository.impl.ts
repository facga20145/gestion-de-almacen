import {
  Injectable,
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LogEmailsRepositoryPort } from '../ports/log-emails-repository.port';
import { LogEmailsCreateRequestDto } from 'src/modules/log-emails/application/dtos/log-emails-create-request.dto';
import { LogEmailsCreateResponseDto } from 'src/modules/log-emails/application/dtos/log-emails-create-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LogEmailsRepositoryImpl implements LogEmailsRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(request: LogEmailsCreateRequestDto, estado: 'ENVIADO' | 'ERROR', mensajeError?: string): Promise<LogEmailsCreateResponseDto> {
    try {
      const logEmail = await this.prisma.logEmail.create({
        data: {
          emailDestino: request.emailDestino,
          asunto: request.asunto,
          estado: estado as any,
          mensajeError,
          cotizacionId: request.cotizacionId,
          usuarioId: request.usuarioId,
        },
      });

      return {
        message: 'Email logged successfully',
        id: logEmail.id,
        emailDestino: logEmail.emailDestino,
        asunto: logEmail.asunto,
        estado: logEmail.estado,
        status_code: HttpStatus.CREATED,
      };
    } catch (e) {
      console.log('Error in create email log:', e);
      throw new BadRequestException('Error creating email log');
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const logEmail = await this.prisma.logEmail.findUnique({
        where: { id },
        include: {
          usuario: {
            select: {
              id: true,
              nombre: true,
              email: true,
            },
          },
        },
      });

      if (!logEmail) {
        throw new NotFoundException('Email log not found');
      }

      return {
        message: 'Email log found successfully',
        id: logEmail.id,
        emailDestino: logEmail.emailDestino,
        asunto: logEmail.asunto,
        fechaEnvio: logEmail.fechaEnvio.toISOString(),
        estado: logEmail.estado,
        mensajeError: logEmail.mensajeError,
        cotizacionId: logEmail.cotizacionId,
        usuario: logEmail.usuario,
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }

      throw new BadRequestException('Error finding email log');
    }
  }

  async findPaginated(params: any): Promise<any> {
    try {
      const page = Math.max(1, Number(params.index ?? 1));
      const limit = Math.max(1, Math.min(100, Number(params.limit ?? 10)));
      const skip = (page - 1) * limit;

      const where: Prisma.LogEmailWhereInput = params.search
        ? {
            OR: [
              {
                emailDestino: {
                  contains: params.search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                asunto: {
                  contains: params.search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : {};

      const [items, totalItems] = await this.prisma.$transaction([
        this.prisma.logEmail.findMany({
          where,
          skip,
          take: limit,
          orderBy: { fechaEnvio: 'desc' },
        }),
        this.prisma.logEmail.count({ where }),
      ]);

      return {
        items: items.map((log) => ({
          message: 'Email log found successfully',
          id: log.id,
          emailDestino: log.emailDestino,
          asunto: log.asunto,
          fechaEnvio: log.fechaEnvio.toISOString(),
          estado: log.estado,
          mensajeError: log.mensajeError,
          cotizacionId: log.cotizacionId,
          status_code: HttpStatus.OK,
        })),
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      };
    } catch (e) {
      console.log('Error in findPaginated:', e);
      throw new BadRequestException('Error finding paginated email logs');
    }
  }
}