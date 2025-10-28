import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepositoryPort } from '../ports/auth-repository.port';
import { AuthRegisterRequestDto } from 'src/modules/auth/application/dtos/auth-register-request.dto';
import { AuthRegisterResponseDto } from 'src/modules/auth/application/dtos/auth-register-response.dto';
import { PrismaService } from 'prisma/prisma.service';
import { JwtPayload } from 'src/modules/auth/domain/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthTokenResponseDto } from 'src/modules/auth/application/dtos/auth-token.response.dto';
import { AuthTokenService } from 'src/modules/auth/domain/services/commands/auth-token.service';
import { UsersFindOneUseCase } from 'src/modules/users/application/use-cases/queries/users-find-one.use-case';
import * as request from 'supertest';
import { AuthRefreshTokenRequestDto } from 'src/modules/auth/application/dtos/auth-refresh-token-request.dto';
import { AuthLoginRequestDto } from 'src/modules/auth/application/dtos/auth-login-request.dto';
import { AuthLoginResponseDto } from 'src/modules/auth/application/dtos/auth-login-response.dto';
import { generateCode } from 'src/utils/helpers/functions.helper';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthForgotPasswordRequestDto } from 'src/modules/auth/application/dtos/auth-forgot-password.request.dto';
import { AuthForgotPasswordResponseDto } from 'src/modules/auth/application/dtos/auth-forgot-password.response.dto';
import { AuthResetPasswordRequestDto } from 'src/modules/auth/application/dtos/auth-reset-password.request.dto';
import { AuthResetPasswordResponseDto } from 'src/modules/auth/application/dtos/auth-reset-password.response.dto';

@Injectable()
export class AuthRepositoryImpl implements AuthRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}
  async resetPassword(
    request: AuthResetPasswordRequestDto,
  ): Promise<AuthResetPasswordResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: request.email },
        include: { profile: true, roles: true },
      });

      if (!user) throw new Error('Usuario no encontrado');
      if (user.code !== request.code) throw new Error('Código inválido');
      if (user.codeExpiresAt && user.codeExpiresAt < new Date()) {
        throw new Error('El código ha expirado');
      }

      const hashedPassword = await bcrypt.hash(request.password, 10);

      const payload: JwtPayload = {
        username: user.username,
        email: user.email,
        profileId: user.profile?.id!,
        roleId: user.roles[0]?.roleId!,
      };

      const tokens = await this.generateTokens(payload);

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          code: null,
          codeExpiresAt: null,
          refreshToken: tokens.refreshToken,
        },
      });

      return {
        message: 'Contraseña actualizada correctamente',
      };
    } catch (error) {
      console.error('Error en resetPassword:', error);
      throw error;
    }
  }
  async requestPasswordReset(
    request: AuthForgotPasswordRequestDto,
  ): Promise<AuthForgotPasswordResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: request.email },
        include: { profile: true, roles: true },
      });
      if (!user) throw new Error('Usuario no encontrado');

      const newCode = generateCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await this.prisma.user.update({
        where: { email: request.email },
        data: { code: newCode, codeExpiresAt: expiresAt },
      });

      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Viaja Ya - Verifica tu cuenta',
        template: 'welcome',
        context: {
          name: `${user.profile?.name} ${user.profile?.lastName}`,
          code: newCode,
          year: new Date().getFullYear(),
        },
      });
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Viaja Ya - Verifica tu cuenta',
        template: 'welcome',
        context: {
          name: `${user.profile?.name} ${user.profile?.lastName}`,
          code: newCode,
          year: new Date().getFullYear(),
        },
      });

      return {
        message: 'Se envió un código de verificación a tu correo electrónico',
      };
    } catch (error) {
      console.error('Error en requestPasswordReset:', error);
      throw error;
    }
  }

  async login(request: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findFirst({
        where: {
          OR: [
            { username: request.username },
            { profile: { email: request.username } },
          ],
        },
        include: { profile: true, roles: { include: { role: true } } },
      });
      if (!user) {
        throw new UnauthorizedException({
          message: 'Credenciales inválidas',
        });
      }

      const isPasswordValid = await bcrypt.compare(
        request.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException({
          message: 'Credenciales inválidas',
        });
      }

      const payload: JwtPayload = {
        username: user.username,
        email: user.profile?.email!,
        profileId: user.profile?.id!,
        roleId: user.roles[0]?.roleId!,
      };

      const tokens = await this.generateTokens(payload);

      await tx.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
      });

      return {
        message: 'Inicio de sesión exitoso',
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      };
    });
  }

  async register(
    request: AuthRegisterRequestDto,
  ): Promise<AuthRegisterResponseDto> {
    try {
      const { username, password, email, name, lastName } = request;

      return await this.prisma.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({ where: { username } });
        if (existingUser) {
          throw new BadRequestException({
            message: 'El usuario ya existe',
          });
        }
        const existingProfile = await tx.profile.findUnique({
          where: { email },
        });
        if (existingProfile) {
          throw new BadRequestException({
            message: 'El email ya está en uso',
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let defaultRole = await tx.role.findFirst({
          where: { name: 'user' },
        });

        if (!defaultRole) {
          defaultRole = await tx.role.create({
            data: {
              name: 'user',
            },
          });
        }

        const user = await tx.user.create({
          data: {
            username,
            password: hashedPassword,
            email,
            profile: {
              create: {
                email,
                name,
                lastName,
              },
            },
            roles: {
              create: [
                {
                  roleId: defaultRole.id,
                },
              ],
            },
          },
          include: {
            profile: true,
            roles: { include: { role: true } },
          },
        });

        const payload: JwtPayload = {
          username: user.username,
          email: user.profile?.email!,
          profileId: user.profile?.id!,
          roleId: user.roles[0]?.roleId!,
        };

        const tokens = await this.generateTokens(payload);

        await tx.user.update({
          where: { id: user.id },
          data: { refreshToken: tokens.refreshToken },
        });

        return {
          message: 'Usuario registrado exitosamente',
        };
      });
    } catch (error) {
      console.error('❌ Error en register:', error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error interno al registrar usuario',
      );
    }
  }

  async refreshToken(
    request: AuthRefreshTokenRequestDto,
  ): Promise<AuthTokenResponseDto> {
    try {
      const payload = await this.verifyRefreshToken(request.token);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.profileId },
        select: { id: true, refreshToken: true },
      });

      if (!user) {
        throw new UnauthorizedException({
          message: 'Usuario no encontrado para el refresh token proporcionado',
        });
      }

      const tokens = await this.generateTokens(payload);

      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
      });
      return {
        message: 'Token renovado exitosamente',
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  async generateTokens(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_KEY_JWT,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_REFRESH_KEY_JWT,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: process.env.SECRET_KEY_JWT,
    });
  }

  async verifyRefreshToken(token: string) {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: process.env.SECRET_REFRESH_KEY_JWT,
    });
  }
}
