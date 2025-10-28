import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsUUID } from 'class-validator';

export class PermissionsAssignDto {
  @ApiProperty({ description: 'IDs de los permisos a asignar', type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  permissionIds: string[];
}
