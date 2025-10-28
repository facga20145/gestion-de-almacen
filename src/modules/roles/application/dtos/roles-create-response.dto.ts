import { ApiProperty } from "@nestjs/swagger";

export class RolesCreateResponseDto {
  @ApiProperty()
  message: string;
}
