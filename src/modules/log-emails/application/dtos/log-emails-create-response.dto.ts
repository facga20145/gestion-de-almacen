import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { EstadoEmail } from '@prisma/client';

export class LogEmailsCreateResponseDto {
  @ApiProperty({ example: 'Email logged successfully' })
  @IsString()
  message: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'cliente@email.com' })
  @IsString()
  emailDestino: string;

  @ApiProperty({ example: 'Cotización de Repuestos Automotrices' })
  @IsString()
  asunto: string;

  @ApiProperty({ example: 'ENVIADO', enum: EstadoEmail })
  @IsEnum(EstadoEmail)
  estado: EstadoEmail;

  @ApiProperty({ example: 201 })
  @IsNumber()
  status_code: number;
}