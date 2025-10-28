import { ApiProperty } from "@nestjs/swagger";

export class AuthTokenResponseDto {
  @ApiProperty({
    example: 'Mensaje de respuesta de la operación',
    description: 'Mensaje de éxito',
    type: String,
  })
  message: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT de acceso (válido por 15 minutos)',
    type: String,
  })
  access_token: string;

 

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'refresh token JWT (válido por 7 días)',
    type: String,
  })
  refresh_token: string;
}
