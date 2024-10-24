import { IsString } from 'class-validator';

export class CreateTutoreDto {
  @IsString()
  nombre: string;

  @IsString()
  correo: string;

  @IsString()
  contrasena: string;
}
