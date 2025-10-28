import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { RolUsuario } from '@prisma/client';

export class UsersFindOneResponseDto {
  @ApiProperty({ example: 'User found successfully' })
  @IsString()
  message: string;
  
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'juan@mail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'VENDEDOR', enum: RolUsuario })
  @IsEnum(RolUsuario)
  rol: RolUsuario;

  @ApiProperty({ example: true })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  fechaRegistro: string;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  updatedAt?: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  status_code: number;
}
