import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator";

export class AuthForgotPasswordRequestDto {
  @IsEmail({}, { message: 'El email debe ser un email válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Email del usuario (debe ser único)',
    type: String,
    required: true,
  })
  email: string;

}
