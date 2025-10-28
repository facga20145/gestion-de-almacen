import { ApiProperty } from '@nestjs/swagger';
import { UsersFindOneResponseDto } from './users-find-one-response.dto';

export class UsersPaginatedResponseDto {
  @ApiProperty({ type: [UsersFindOneResponseDto] })
  items: UsersFindOneResponseDto[];

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  totalPages: number;

  @ApiProperty({ example: 100 })
  totalItems: number;
}
