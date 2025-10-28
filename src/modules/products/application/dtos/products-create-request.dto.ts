import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, Min, MaxLength } from 'class-validator';

export class ProductsCreateRequestDto {
  @ApiProperty({ example: 'Filtro de aceite motor' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Filtro de aceite para motor 1.6L', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 25.50 })
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'Filtros', required: false })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  proveedorId: number;
}