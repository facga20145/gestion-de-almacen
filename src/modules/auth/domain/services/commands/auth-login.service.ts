import { AuthLoginRequestDto } from "src/modules/auth/application/dtos/auth-login-request.dto";
import { AuthLoginResponseDto } from "src/modules/auth/application/dtos/auth-login-response.dto";
import { IAuthLogin } from "../../interfaces/auth-login.interface";
import { Inject, Injectable } from "@nestjs/common";
import { AuthRepositoryPort } from "src/modules/auth/infrastructure/adapters/ports/auth-repository.port";

@Injectable()
export class AuthLoginService implements IAuthLogin {
  constructor(
    @Inject('AuthRepositoryPort')
    private readonly repo: AuthRepositoryPort,
  ) {}

  login(request: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    return this.repo.login(request);
  }
}