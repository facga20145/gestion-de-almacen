import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class ProductsUpdateRequestDto {
  @ApiProperty({ example: 'Filtro de aceite motor actualizado', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'Filtro de aceite para motor 1.6L actualizado', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 30.00, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  precio?: number;

  @ApiProperty({ example: 75, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;

  @ApiProperty({ example: 'Filtros Premium', required: false })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  proveedorId?: number;
}