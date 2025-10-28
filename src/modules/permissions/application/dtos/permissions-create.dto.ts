import { IsString, IsNotEmpty } from 'class-validator';

export class PermissionsCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  flag: string;

  @IsNotEmpty()
  status: boolean;
}
