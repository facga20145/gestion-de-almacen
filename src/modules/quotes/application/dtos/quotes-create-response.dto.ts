import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { EstadoCotizacion } from '@prisma/client';

export class QuotesCreateResponseDto {
  @ApiProperty({ example: 'Quote created successfully' })
  @IsString()
  message: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'COT-2024-001' })
  @IsString()
  codigo: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  clienteNombre: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsString()
  clienteEmail: string;

  @ApiProperty({ example: 66.00 })
  @IsNumber()
  total: number;

  @ApiProperty({ example: 'PENDIENTE', enum: EstadoCotizacion })
  @IsEnum(EstadoCotizacion)
  estado: EstadoCotizacion;

  @ApiProperty({ example: 201 })
  @IsNumber()
  status_code: number;
}