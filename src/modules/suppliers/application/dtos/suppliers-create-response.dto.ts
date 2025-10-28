import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional, IsEmail } from 'class-validator';

export class SuppliersCreateResponseDto {
  @ApiProperty({ example: 'Supplier created successfully' })
  @IsString()
  message: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Auto Parts Inc.' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  telefono?: string | null;

  @ApiProperty({ example: 'contacto@autoparts.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string | null;

  @ApiProperty({ example: 'Av. Principal 123', required: false })
  @IsString()
  @IsOptional()
  direccion?: string | null;

  @ApiProperty({ example: true })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @IsString()
  fechaRegistro: string;

  @ApiProperty({ example: 201 })
  @IsNumber()
  status_code: number;
}