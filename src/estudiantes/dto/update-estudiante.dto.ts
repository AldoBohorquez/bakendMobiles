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
  @IsDate()
  fecha_nacimiento: Date;
  @IsString()
  direccion: string;
}
