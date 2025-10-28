import { AuthLoginRequestDto } from "../../application/dtos/auth-login-request.dto";
import { AuthLoginResponseDto } from "../../application/dtos/auth-login-response.dto";

export interface IAuthLogin {
  login(request: AuthLoginRequestDto): Promise<AuthLoginResponseDto>;
}
