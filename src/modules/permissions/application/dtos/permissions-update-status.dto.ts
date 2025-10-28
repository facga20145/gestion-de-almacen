import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class PermissionsUpdateStatusDto {
  @ApiProperty({ description: 'Estado activo/inactivo del permiso' })
  @IsBoolean()
  active: boolean;
}
