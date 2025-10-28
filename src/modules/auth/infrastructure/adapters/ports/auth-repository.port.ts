import { AuthLoginRequestDto } from 'src/modules/auth/application/dtos/auth-login-request.dto';
import { AuthLoginResponseDto } from 'src/modules/auth/application/dtos/auth-login-response.dto';
import { AuthRefreshTokenRequestDto } from 'src/modules/auth/application/dtos/auth-refresh-token-request.dto';
import { AuthRegisterRequestDto } from 'src/modules/auth/application/dtos/auth-register-request.dto';
import { AuthRegisterResponseDto } from 'src/modules/auth/application/dtos/auth-register-response.dto';
import { AuthTokenResponseDto } from 'src/modules/auth/application/dtos/auth-token.response.dto';
import { AuthForgotPasswordRequestDto } from 'src/modules/auth/application/dtos/auth-forgot-password.request.dto';
import { AuthForgotPasswordResponseDto } from 'src/modules/auth/application/dtos/auth-forgot-password.response.dto';
import { JwtPayload } from 'src/modules/auth/domain/interfaces/jwt-payload.interface';
import * as request from 'supertest';
import { AuthResetPasswordRequestDto } from 'src/modules/auth/application/dtos/auth-reset-password.request.dto';
import { AuthResetPasswordResponseDto } from 'src/modules/auth/application/dtos/auth-reset-password.response.dto';
export abstract class AuthRepositoryPort {
  abstract register(
    request: AuthRegisterRequestDto,
  ): Promise<AuthRegisterResponseDto>;

  abstract login(request: AuthLoginRequestDto): Promise<AuthLoginResponseDto>;

  abstract refreshToken(
    request: AuthRefreshTokenRequestDto,
  ): Promise<AuthTokenResponseDto>;
  abstract generateTokens(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  abstract verifyAccessToken(token: string): Promise<JwtPayload>;
  abstract verifyRefreshToken(token: string): Promise<JwtPayload>;
  abstract requestPasswordReset(
    request: AuthForgotPasswordRequestDto,
  ): Promise<AuthForgotPasswordResponseDto>;

  abstract resetPassword(
    request: AuthResetPasswordRequestDto,
  ): Promise<AuthResetPasswordResponseDto>;
}