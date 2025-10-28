import { AuthRepositoryPort } from "src/modules/auth/infrastructure/adapters/ports/auth-repository.port";
import { IAuthResetPassword } from "../../interfaces/auth-reset-password.interface";
import { AuthResetPasswordRequestDto } from "src/modules/auth/application/dtos/auth-reset-password.request.dto";
import { AuthResetPasswordResponseDto } from "src/modules/auth/application/dtos/auth-reset-password.response.dto";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AuthResetPasswordService implements IAuthResetPassword {
  constructor(
    @Inject('AuthRepositoryPort')
    private readonly repo: AuthRepositoryPort,
  ) {}

  resetPassword(request: AuthResetPasswordRequestDto): Promise<AuthResetPasswordResponseDto> {
    return this.repo.resetPassword(request);
  }
}