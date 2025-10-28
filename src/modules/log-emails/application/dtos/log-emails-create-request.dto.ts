import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class LogEmailsCreateRequestDto {
  @ApiProperty({ example: 'cliente@email.com' })
  @IsEmail()
  emailDestino: string;

  @ApiProperty({ example: 'Cotización de Repuestos Automotrices' })
  @IsString()
  asunto: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  cotizacionId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  usuarioId?: number;
}