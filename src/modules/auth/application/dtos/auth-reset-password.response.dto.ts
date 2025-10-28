import { ApiProperty } from "@nestjs/swagger";

export class AuthResetPasswordResponseDto {
  @ApiProperty({
    example: 'Mensaje de respuesta de la operación',
    description: 'Mensaje de éxito',
    type: String,
  })
  message: string;
}
