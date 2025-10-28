import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, Matches, IsNotEmpty, IsDate } from 'class-validator';
import { MatchPassword } from '../../../../utils/decorators/match-password.decorator';

export class AuthRegisterRequestDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
    type: String,
    required: true,
  })
  name: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @ApiProperty({
    example: 'Perez',
    description: 'Apellido del usuario',
    type: String,
    required: true,
  })
  lastName: string;

  @IsString({ message: 'El username debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El username es obligatorio' })
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description:
      'Username del usuario (puede ser email o username normal, debe ser único)',
    type: String,
    required: true,
  })
  username: string;

  @IsEmail({}, { message: 'El email debe ser un email válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Email del usuario (debe ser único)',
    type: String,
    required: true,
  })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(128, { message: 'La contraseña no puede exceder 128 caracteres' })
  @Matches(/^\S*$/, { message: 'La contraseña no puede contener espacios' })
  @ApiProperty({
    example: 'Contraseña123!',
    description: 'Contraseña del usuario (mínimo 6 caracteres, sin espacios)',
    type: String,
    required: true,
  })
  password: string;

  @IsString({
    message: 'La confirmación de contraseña debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'La confirmación de contraseña es obligatoria' })
  @MatchPassword('password', { message: 'Las contraseñas no coinciden' })
  @ApiProperty({
    example: 'Contraseña123!',
    description: 'Confirmación de la contraseña (debe coincidir con password)',
    type: String,
    required: true,
  })
  confirmPassword: string;

 
}
