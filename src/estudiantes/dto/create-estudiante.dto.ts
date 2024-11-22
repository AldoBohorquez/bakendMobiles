import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  nombre: string;

  @IsString()
  apellidoP: string;

  @IsString()
  apellidoM: string;
  @IsString()
  fecha_nacimiento: string;
  @IsString()
  direccion: string;
  @IsNumber()
  id_tutor: number;
}
