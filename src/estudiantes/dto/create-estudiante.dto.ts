import { IsDate, IsString } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  nombre: string;
  @IsString()
  apellido: string;
  @IsDate()
  fecha_nacimiento: Date;
  @IsString()
  email: string;
  @IsString()
  telefono: string;
  @IsString()
  direccion: string;
}
