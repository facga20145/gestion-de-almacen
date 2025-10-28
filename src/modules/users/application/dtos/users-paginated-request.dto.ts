import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UsersPaginatedRequestDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Número de página (1 por defecto)',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  index = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Cantidad de usuarios por página',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @ApiPropertyOptional({
    example: 'Juan López',
    description: 'Filtro por nombre o apellido',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
