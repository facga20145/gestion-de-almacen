import { Inject, Injectable } from "@nestjs/common";
import { AuthResetPasswordService } from "src/modules/auth/domain/services/commands/auth-reset-password.service";
import { AuthResetPasswordRequestDto } from "../../dtos/auth-reset-password.request.dto";
import { AuthResetPasswordResponseDto } from "../../dtos/auth-reset-password.response.dto";

@Injectable()
export class AuthResetPasswordUseCase {
  constructor(
    @Inject('IAuthResetPassword') private readonly service: AuthResetPasswordService,
  ) {}

  async run(request: AuthResetPasswordRequestDto): Promise<AuthResetPasswordResponseDto> {
    return this.service.resetPassword(request);
  }
}
