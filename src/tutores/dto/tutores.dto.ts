import { IsString } from 'class-validator';

export class LoginTutoresDto {
  @IsString()
  correo: string;

  @IsString()
  contrasena: string;
}
