import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class ProductsCreateResponseDto {
  @ApiProperty({ example: 'Product created successfully' })
  @IsString()
  message: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Filtro de aceite motor' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Filtro de aceite para motor 1.6L', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string | null;

  @ApiProperty({ example: 25.50 })
  @IsNumber()
  precio: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  stock: number;

  @ApiProperty({ example: 'Filtros', required: false })
  @IsString()
  @IsOptional()
  categoria?: string | null;

  @ApiProperty({ example: true })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @IsDateString()
  fechaRegistro: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  proveedorId: number;

  @ApiProperty({ example: 201 })
  @IsNumber()
  status_code: number;
}