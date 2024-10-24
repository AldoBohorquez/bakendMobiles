import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  nombre: string;

  @IsString()
  apellidoP: string;

  @IsString()
  apellidoM: string;
  @IsDate()
  fecha_nacimiento: Date;
  @IsString()
  direccion: string;
  @IsNumber()
  id_tutor: number;
}
