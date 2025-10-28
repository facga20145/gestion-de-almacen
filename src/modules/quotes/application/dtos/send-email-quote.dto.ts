import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  @ApiProperty({ 
    example: 'Filtro de aceite',
    description: 'Nombre del producto',
    required: true
  })
  @IsString()
  nombre: string;

  @ApiProperty({ 
    example: 2,
    description: 'Cantidad de productos',
    required: true
  })
  @IsNumber()
  cantidad: number;

  @ApiProperty({ 
    example: 25.50,
    description: 'Precio unitario del producto',
    required: true
  })
  @IsNumber()
  precioUnitario: number;

  @ApiProperty({ 
    example: 51.00,
    description: 'Subtotal (cantidad × precio unitario)',
    required: true
  })
  @IsNumber()
  subtotal: number;
}

export class SendEmailQuoteDto {
  @ApiProperty({ 
    example: 'cliente@email.com',
    description: 'Email del cliente al que se enviará la cotización',
    required: true
  })
  @IsEmail()
  emailDestino: string;

  @ApiProperty({ 
    example: 'Juan Pérez',
    description: 'Nombre completo del cliente',
    required: true
  })
  @IsString()
  clienteNombre: string;

  @ApiProperty({ 
    example: 'COT-1234567890-001',
    description: 'Código único de la cotización',
    required: true
  })
  @IsString()
  codigo: string;

  @ApiProperty({ 
    example: '2024-01-15',
    description: 'Fecha de la cotización (formato YYYY-MM-DD)',
    required: true
  })
  @IsString()
  fecha: string;

  @ApiProperty({ 
    example: 'María González',
    description: 'Nombre del vendedor que generó la cotización',
    required: true
  })
  @IsString()
  vendedorNombre: string;

  @ApiProperty({ 
    example: 125.50,
    description: 'Total de la cotización en formato numérico',
    required: true
  })
  @IsNumber()
  total: number;

  @ApiProperty({ 
    type: [ItemDto],
    description: 'Lista de productos incluidos en la cotización',
    example: [
      { nombre: 'Filtro de aceite', cantidad: 2, precioUnitario: 25.50, subtotal: 51.00 },
      { nombre: 'Bujías', cantidad: 1, precioUnitario: 35.00, subtotal: 35.00 }
    ],
    required: true
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}

