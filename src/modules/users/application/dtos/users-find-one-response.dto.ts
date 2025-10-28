import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UsersFindOneResponseDto {
  @ApiProperty({ example: 'User found successfully' })
  @IsString()
  message: string;
  
  @ApiProperty({ example: '8UJUEWQ8j2' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'juan@mail.com' })
  @IsString()
  username: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  createdAt: string;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  updatedAt?: string | null;

  @ApiProperty({ example: 200 })
  @IsNumber()
  status_code: number;
}
