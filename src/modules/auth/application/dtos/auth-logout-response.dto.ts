import { ApiProperty } from '@nestjs/swagger';

export class AuthLogoutResponseDto {
  @ApiProperty({
    example: 200,
    description: 'Código de estado HTTP',
    type: Number,
  })
  status_code: number;

  @ApiProperty({
    example: 'Sesión cerrada exitosamente',
    description: 'Mensaje de confirmación',
    type: String,
  })
  message: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el logout fue exitoso',
    type: Boolean,
  })
  success: boolean;
}
