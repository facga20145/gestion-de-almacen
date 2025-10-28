import { AuthRegisterRequestDto } from "../../application/dtos/auth-register-request.dto";
import { AuthRegisterResponseDto } from '../../application/dtos/auth-register-response.dto';

export interface IAuthRegister {
    register(request: AuthRegisterRequestDto): Promise<AuthRegisterResponseDto>;
}