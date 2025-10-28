import { AuthResetPasswordRequestDto } from "../../application/dtos/auth-reset-password.request.dto";
import { AuthResetPasswordResponseDto } from "../../application/dtos/auth-reset-password.response.dto";

export interface IAuthResetPassword {
  resetPassword(
    request: AuthResetPasswordRequestDto,
  ): Promise<AuthResetPasswordResponseDto>;
}