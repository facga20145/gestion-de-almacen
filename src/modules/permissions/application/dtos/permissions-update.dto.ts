import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PermissionsUpdateDto {
  @ApiPropertyOptional({ description: 'Nombre del permiso' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Flag del permiso' })
  @IsOptional()
  @IsString()
  flag?: string;
}
