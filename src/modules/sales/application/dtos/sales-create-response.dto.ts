import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { MetodoPago } from '@prisma/client';

export class SalesCreateResponseDto {
  @ApiProperty({ example: 'Sale created successfully' })
  @IsString()
  message: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: '2024-01-15T00:00:00.000Z' })
  @IsString()
  fecha: string;

  @ApiProperty({ example: 66.00 })
  @IsNumber()
  total: number;

  @ApiProperty({ example: 'EFECTIVO', enum: MetodoPago })
  @IsEnum(MetodoPago)
  metodoPago: MetodoPago;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  clienteNombre: string;

  @ApiProperty({ example: 'juan@email.com', required: false })
  @IsString()
  clienteEmail: string | null;

  @ApiProperty({ example: 201 })
  @IsNumber()
  status_code: number;
}