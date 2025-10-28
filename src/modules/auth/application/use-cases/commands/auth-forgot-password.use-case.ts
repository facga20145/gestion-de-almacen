import { Inject } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { AuthForgotPasswordRequestDto } from "../../dtos/auth-forgot-password.request.dto";
import { AuthForgotPasswordResponseDto } from "../../dtos/auth-forgot-password.response.dto";
import { AuthForgotPasswordService } from "src/modules/auth/domain/services/commands/auth-forgot-password.service";

@Injectable()
export class AuthForgotPasswordUseCase {
  constructor(
    @Inject('IAuthForgotPassword') private readonly service: AuthForgotPasswordService,
  ) {}

  async run(request: AuthForgotPasswordRequestDto): Promise<AuthForgotPasswordResponseDto> {
    return this.service.requestPasswordReset(request);
  }
}
