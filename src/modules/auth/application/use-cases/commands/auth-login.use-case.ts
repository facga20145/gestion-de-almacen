import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AUTH_SERVICE } from '../../../infrastructure/config/auth.tokens';
import { AuthLoginRequestDto } from '../../dtos/auth-login-request.dto';
import { AuthLoginResponseDto } from '../../dtos/auth-login-response.dto';
import { AuthLoginService } from 'src/modules/auth/domain/services/commands/auth-login.service';

@Injectable()
export class AuthLoginUseCase {
  constructor(
    @Inject('IAuthLogin') private readonly service: AuthLoginService,
  ) {}

  async run(request: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    return this.service.login(request);
  }
}
