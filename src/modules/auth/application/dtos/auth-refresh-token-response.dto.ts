import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshTokenResponseDto {

  @ApiProperty({
    example: 'Token renovado exitosamente',
    description: 'Mensaje de confirmación',
    type: String,
  })
  message: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Nuevo JWT de acceso (válido por 15 minutos)',
    type: String,
  })
  access_token: string;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Renovación del token de acceso (válido por 7 días)',
    type: String,
  })
  refresh_token: string;
}
