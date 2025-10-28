import { Inject, Injectable } from '@nestjs/common';
import { IAuthRegister } from '../../interfaces/auth-register.interface';
import { AuthRegisterRequestDto } from 'src/modules/auth/application/dtos/auth-register-request.dto';
import { AuthRegisterResponseDto } from 'src/modules/auth/application/dtos/auth-register-response.dto';
import { AuthRepositoryPort } from 'src/modules/auth/infrastructure/adapters/ports/auth-repository.port';
  
@Injectable()
export class AuthRegisterService implements IAuthRegister {
  constructor(
    @Inject('AuthRepositoryPort')
    private readonly repo: AuthRepositoryPort,
  ) {}
  register(data: AuthRegisterRequestDto): Promise<AuthRegisterResponseDto> {
    return this.repo.register(data);
  }
}