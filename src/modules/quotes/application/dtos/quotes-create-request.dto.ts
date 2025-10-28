import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsArray, ValidateNested, IsEmail } from 'class-validator';
import { EstadoCotizacion } from '@prisma/client';
import { Type } from 'class-transformer';

export class QuoteItemDto {
  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 2 })
  cantidad: number;

  @ApiProperty({ example: 25.50 })
  precioUnitario: number;
}

export class QuotesCreateRequestDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  clienteNombre: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail()
  clienteEmail: string;

  @ApiProperty({ 
    type: [QuoteItemDto],
    example: [
      { productId: 1, cantidad: 2, precioUnitario: 25.50 },
      { productId: 2, cantidad: 1, precioUnitario: 15.00 }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuoteItemDto)
  items: QuoteItemDto[];
}