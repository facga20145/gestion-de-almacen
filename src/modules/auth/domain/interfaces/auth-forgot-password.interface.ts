import { AuthForgotPasswordRequestDto } from "../../application/dtos/auth-forgot-password.request.dto";
import { AuthForgotPasswordResponseDto } from "../../application/dtos/auth-forgot-password.response.dto";

export interface IAuthForgotPassword {
  requestPasswordReset(
    request: AuthForgotPasswordRequestDto,
  ): Promise<AuthForgotPasswordResponseDto>;
}
