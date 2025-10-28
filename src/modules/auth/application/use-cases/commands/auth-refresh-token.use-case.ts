import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AUTH_SERVICE } from '../../../infrastructure/config/auth.tokens';
import { AuthRefreshTokenRequestDto } from '../../dtos/auth-refresh-token-request.dto';
import { AuthRefreshTokenResponseDto } from '../../dtos/auth-refresh-token-response.dto';
import { AuthTokenService } from 'src/modules/auth/domain/services/commands/auth-token.service';

@Injectable()
export class AuthRefreshTokenUseCase {
  constructor(
    @Inject('IAuthRefreshToken') private readonly service: AuthTokenService,
  ) {}

  async run(
    request: AuthRefreshTokenRequestDto,
  ): Promise<AuthRefreshTokenResponseDto> {
    return this.service.refreshToken(request);
  }
}
