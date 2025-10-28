import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class LogEmailsUpdateResponseDto {
  @ApiProperty({ example: 'Email log updated successfully' })
  @IsString()
  message: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  status_code: number;
}