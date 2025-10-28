import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { AUTH_SERVICE } from '../../../infrastructure/config/auth.tokens';
import { AuthRegisterRequestDto } from '../../dtos/auth-register-request.dto';
import { AuthRegisterResponseDto } from '../../dtos/auth-register-response.dto';
import { AuthRepositoryPort } from 'src/modules/auth/infrastructure/adapters/ports/auth-repository.port';
import { AuthRegisterService } from 'src/modules/auth/domain/services/commands/auth-register.service';

@Injectable()
export class AuthRegisterUseCase {
  constructor(
    @Inject('IAuthRegister') private readonly service: AuthRegisterService,
  ) {}

  async run(request: AuthRegisterRequestDto): Promise<AuthRegisterResponseDto> {
    return this.service.register(request);
  }
}
