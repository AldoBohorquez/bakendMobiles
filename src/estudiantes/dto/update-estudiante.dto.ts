import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { IsDate, IsString } from 'class-validator';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
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
}
