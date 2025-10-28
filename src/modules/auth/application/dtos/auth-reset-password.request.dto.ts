import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MatchPassword } from 'src/utils/decorators/match-password.decorator';

export class AuthResetPasswordRequestDto {
  @IsEmail({}, { message: 'El email debe ser un email válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Email del usuario (debe ser único)',
    type: String,
    required: true,
  })
  email: string;

  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @ApiProperty({
    example: '123456',
    description: 'Código de verificación enviado al email',
    type: String,
    required: true,
  })
  code: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(128, { message: 'La contraseña no puede exceder 128 caracteres' })
  @Matches(/^\S*$/, { message: 'La contraseña no puede contener espacios' })
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un símbolo',
    },
  )
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
