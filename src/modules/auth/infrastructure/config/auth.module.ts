import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../controllers/auth.controller';
import { AuthRegisterService } from '../../domain/services/commands/auth-register.service';
import { AuthRegisterUseCase } from '../../application/use-cases/commands/auth-register.use-case';
import { AuthRepositoryImpl } from '../adapters/implements/auth-repository.impl';
import { JwtModule } from '@nestjs/jwt';
import { AuthTokenService } from '../../domain/services/commands/auth-token.service';
import { AuthRefreshTokenUseCase } from '../../application/use-cases/commands/auth-refresh-token.use-case';
import { AuthLoginService } from '../../domain/services/commands/auth-login.service';
import { AuthLoginUseCase } from '../../application/use-cases/commands/auth-login.use-case';
import { join } from 'path';
import { AuthForgotPasswordService } from '../../domain/services/commands/auth-forgot-password.service';
import { AuthForgotPasswordUseCase } from '../../application/use-cases/commands/auth-forgot-password.use-case';
import { AuthResetPasswordService } from '../../domain/services/commands/auth-reset-password.service';
import { AuthResetPasswordUseCase } from '../../application/use-cases/commands/auth-reset-password.use-case';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('SECRET_KEY_JWT'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),

    // 👇 Aquí agregas el MailerModule correctamente
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: config.get('GMAIL_USER'),
            pass: config.get('GMAIL_APP_PASSWORD'),
          },
        },
        defaults: {
          from: `"Viaja Ya" <${config.get('GMAIL_USER')}>`,
        },
        template: {
          dir: join(process.cwd(), 'src/utils/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthTokenService,
    { provide: 'IAuthRegister', useClass: AuthRegisterService },
    { provide: 'IAuthRefreshToken', useClass: AuthTokenService },
    { provide: 'IAuthLogin', useClass: AuthLoginService },
    { provide: 'IAuthForgotPassword', useClass: AuthForgotPasswordService },
    { provide: 'IAuthResetPassword', useClass: AuthResetPasswordService },
    AuthRegisterUseCase,
    AuthRefreshTokenUseCase,
    AuthLoginUseCase,
    AuthForgotPasswordUseCase,
    AuthResetPasswordUseCase,
    {
      provide: 'AuthRepositoryPort',
      useClass: AuthRepositoryImpl,
    },
  ],
  exports: [AuthTokenService],
})
export class AuthModule {}
