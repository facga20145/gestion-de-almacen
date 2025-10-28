import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class SuppliersCreateRequestDto {
  @ApiProperty({ example: 'Auto Parts Inc.' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({ example: 'contacto@autoparts.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'Av. Principal 123', required: false })
  @IsString()
  @IsOptional()
  direccion?: string;
}