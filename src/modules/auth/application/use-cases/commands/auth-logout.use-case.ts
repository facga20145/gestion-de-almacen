import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AUTH_SERVICE } from '../../../infrastructure/config/auth.tokens';
import { AuthLogoutRequestDto } from '../../dtos/auth-logout-request.dto';
import { AuthLogoutResponseDto } from '../../dtos/auth-logout-response.dto';

@Injectable()
export class AuthLogoutUseCase {}
