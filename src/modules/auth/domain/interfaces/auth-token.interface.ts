import { JwtPayload } from 'jsonwebtoken';
import { AuthTokenResponseDto } from '../../application/dtos/auth-token.response.dto';
import * as request from 'supertest';
import { AuthRefreshTokenRequestDto } from '../../application/dtos/auth-refresh-token-request.dto';

export interface IAuthToken {
  refreshToken(request: AuthRefreshTokenRequestDto): Promise<AuthTokenResponseDto>;
  generateTokens(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  verifyAccessToken(token: string): Promise<JwtPayload>;
  verifyRefreshToken(token: string): Promise<JwtPayload>;
}
