/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthTokenService } from 'src/modules/auth/domain/services/commands/auth-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: AuthTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token no proporcionado');

    const token = authHeader.split(' ')[1]; 
    try {
      const payload = await this.tokenService.verifyAccessToken(token);
      request.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
