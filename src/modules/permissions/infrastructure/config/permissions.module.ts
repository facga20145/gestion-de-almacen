import { Module } from '@nestjs/common';
import { PermissionsController } from '../controllers/permissions.controller';

@Module({
  imports: [],
  controllers: [PermissionsController], // <-- registra el controller aquí
  providers: [], // aquí irán tus servicios si los agregas más adelante
})
export class PermissionsModule {}
