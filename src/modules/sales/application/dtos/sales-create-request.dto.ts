import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { MetodoPago } from '@prisma/client';
import { Type } from 'class-transformer';

export class SaleItemDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  cantidad: number;

  @ApiProperty({ example: 25.50 })
  @IsNumber()
  precioUnitario: number;
}

export class SalesCreateRequestDto {
  @ApiProperty({ example: 'EFECTIVO', enum: MetodoPago })
  @IsEnum(MetodoPago)
  metodoPago: MetodoPago;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  clienteNombre: string;

  @ApiProperty({ example: 'juan@email.com', required: false })
  @IsString()
  @IsOptional()
  clienteEmail?: string;

  @ApiProperty({ example: '123456789', required: false })
  @IsString()
  @IsOptional()
  clienteTelefono?: string;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  cotizacionId?: number;

  @ApiProperty({ 
    type: [SaleItemDto],
    example: [
      { productId: 1, cantidad: 2, precioUnitario: 25.50 },
      { productId: 2, cantidad: 1, precioUnitario: 15.00 }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  items: SaleItemDto[];
}