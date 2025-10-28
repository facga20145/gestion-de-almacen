import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoCotizacion } from '@prisma/client';

export class QuotesUpdateRequestDto {
  @ApiProperty({ example: 'ENVIADA', enum: EstadoCotizacion, required: false })
  @IsEnum(EstadoCotizacion)
  @IsOptional()
  estado?: EstadoCotizacion;
}