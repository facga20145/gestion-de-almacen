import { Inject, Injectable } from "@nestjs/common";
import { IAuthToken } from "../../interfaces/auth-token.interface";
import { AuthRepositoryPort } from "src/modules/auth/infrastructure/adapters/ports/auth-repository.port";
import { AuthTokenResponseDto } from "src/modules/auth/application/dtos/auth-token.response.dto";
import { JwtPayload } from "../../interfaces/jwt-payload.interface";
import { AuthRefreshTokenRequestDto } from "src/modules/auth/application/dtos/auth-refresh-token-request.dto";

@Injectable()
export class AuthTokenService implements IAuthToken {
  constructor(
    @Inject('AuthRepositoryPort')
    private readonly repo: AuthRepositoryPort,
  ) {}

  async refreshToken(request: AuthRefreshTokenRequestDto): Promise<AuthTokenResponseDto> {
    return this.repo.refreshToken(request);
  }

  generateTokens(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.repo.generateTokens(payload);
  }
  verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.repo.verifyAccessToken(token);
  }
  verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.repo.verifyRefreshToken(token);
  }
}