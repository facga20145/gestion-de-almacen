import { Inject, Injectable } from "@nestjs/common";
import { IAuthForgotPassword } from "../../interfaces/auth-forgot-password.interface";
import { AuthRepositoryPort } from "src/modules/auth/infrastructure/adapters/ports/auth-repository.port";
import { AuthForgotPasswordRequestDto } from "src/modules/auth/application/dtos/auth-forgot-password.request.dto";
import { AuthForgotPasswordResponseDto } from "src/modules/auth/application/dtos/auth-forgot-password.response.dto";

@Injectable()
export class AuthForgotPasswordService implements IAuthForgotPassword {
  constructor(
    @Inject('AuthRepositoryPort')
    private readonly repo: AuthRepositoryPort,
  ) {}
  requestPasswordReset(request: AuthForgotPasswordRequestDto): Promise<AuthForgotPasswordResponseDto> {
    return this.repo.requestPasswordReset(request);
  }
}