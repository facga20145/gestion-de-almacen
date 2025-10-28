import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class QuotesUpdateResponseDto {
  @ApiProperty({ example: 'Quote updated successfully' })
  @IsString()
  message: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  status_code: number;
}