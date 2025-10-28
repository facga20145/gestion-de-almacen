import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AuthLoginRequestDto {
  @IsString({ message: 'El username debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El username es obligatorio' })
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Username del usuario registrado (puede ser email o username normal)',
    type: String,
    required: true,
  })
  username: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @ApiProperty({
    example: 'Contraseña123!',
    description: 'Contraseña del usuario',
    type: String,
    required: true,
  })
  password: string;
}
