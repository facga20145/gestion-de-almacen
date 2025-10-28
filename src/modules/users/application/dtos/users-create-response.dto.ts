import { ApiProperty } from '@nestjs/swagger';

export class UsersCreateResponseDto {
  @ApiProperty()
  status_code: number;

  @ApiProperty()
  message: string;
}
