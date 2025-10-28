import { ApiProperty } from '@nestjs/swagger';

export class UsersUpdateStatusResponseDto {
  @ApiProperty()
  status_code: number;

  @ApiProperty()
  message: string;
}
