import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, isBoolean, IsNotEmpty, IsString } from 'class-validator';

export class RolesCreateRequestDto {
  @ApiProperty({
    description: 'Nombre del rol',
    example: 'Admin',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Estado del rol',
    example: true,
    type: Boolean,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
