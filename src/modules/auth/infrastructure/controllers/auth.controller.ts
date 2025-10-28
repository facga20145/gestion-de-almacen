import { Body, Controller, HttpStatus, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorResponses,
  ApiSuccessResponse,
} from 'src/utils/decorators/api-swagger.decorator';

// Casos de FOKIN uso
import { AuthRegisterUseCase } from '../../application/use-cases/commands/auth-register.use-case';

// DTO Request
import { AuthRegisterRequestDto } from '../../application/dtos/auth-register-request.dto';

// DTO Response
import { AuthRegisterResponseDto } from '../../application/dtos/auth-register-response.dto';
import { CustomResponseInterceptor } from 'src/utils/interceptors/customresponse.interceptor';
import { AuthRefreshTokenUseCase } from '../../application/use-cases/commands/auth-refresh-token.use-case';
import { AuthRefreshTokenRequestDto } from '../../application/dtos/auth-refresh-token-request.dto';
import { AuthRefreshTokenResponseDto } from '../../application/dtos/auth-refresh-token-response.dto';
import { AuthLoginResponseDto } from '../../application/dtos/auth-login-response.dto';
import { AuthLoginRequestDto } from '../../application/dtos/auth-login-request.dto';
import { AuthLoginUseCase } from '../../application/use-cases/commands/auth-login.use-case';
import { AuthForgotPasswordUseCase } from '../../application/use-cases/commands/auth-forgot-password.use-case';
import { AuthForgotPasswordResponseDto } from '../../application/dtos/auth-forgot-password.response.dto';
import { AuthForgotPasswordRequestDto } from '../../application/dtos/auth-forgot-password.request.dto';
import { AuthResetPasswordResponseDto } from '../../application/dtos/auth-reset-password.response.dto';
import { AuthResetPasswordRequestDto } from '../../application/dtos/auth-reset-password.request.dto';
import { AuthResetPasswordUseCase } from '../../application/use-cases/commands/auth-reset-password.use-case';

@ApiTags('Autentication')
@UseInterceptors(CustomResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: AuthRegisterUseCase,
    private readonly loginUseCase: AuthLoginUseCase,
    private readonly refreshTokenUseCase: AuthRefreshTokenUseCase,
    private readonly forgotPasswordUseCase: AuthForgotPasswordUseCase,
    private readonly resetPasswordUseCase: AuthResetPasswordUseCase,
  ) {}
  @Post('register')
  @ApiOperation({
    summary: 'Crear nuevo registro de un nuevo usuario',
    description: 'Permite registrar un nuevo usuario',
  })
  @ApiSuccessResponse(
    HttpStatus.CREATED,
    'Usuario registrado correctamente',
    AuthRegisterResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.CONFLICT,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async create(@Body() request: AuthRegisterRequestDto) {
    return await this.registerUseCase.run(request);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Permite iniciar sesión con un usuario registrado',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Inicio de sesión exitoso',
    AuthLoginResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async login(@Body() request: AuthLoginRequestDto) {
    return await this.loginUseCase.run(request);
  }

  @Post('refresh-token')
  @ApiOperation({
    summary: 'Renovar tokens de autenticación',
    description: 'Permite renovar los tokens de autenticación',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Tokens renovados correctamente',
    AuthRefreshTokenResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async refreshToken(@Body() request: AuthRefreshTokenRequestDto) {
    return await this.refreshTokenUseCase.run(request);
  }

  @Post('forgot-password')
  @ApiOperation({
    summary: 'Olvidé mi contraseña',
    description: 'Endpoint para solicitar un restablecimiento de contraseña',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Código de verificación enviado correctamente',
    AuthForgotPasswordResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async forgotPassword(
    @Body() request: AuthForgotPasswordRequestDto,
  ): Promise<AuthForgotPasswordResponseDto> {
    return this.forgotPasswordUseCase.run(request);
  }

  @Patch('reset-password')
  @ApiOperation({
    summary: 'Actualizar contraseña',
    description: 'Endpoint para actualizar la contraseña del usuario',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Contraseña actualizada correctamente',
    AuthResetPasswordResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async resetPassword(
    @Body() request: AuthResetPasswordRequestDto,
  ): Promise<AuthResetPasswordResponseDto> {
    return this.resetPasswordUseCase.run(request);
  }
}
