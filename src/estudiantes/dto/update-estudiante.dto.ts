import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { IsDate, IsString } from 'class-validator';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
  @IsString()
  nombreCompleto: string;
  @IsDate()
  fecha_nacimiento: Date;
  @IsString()
  email: string;
  @IsString()
  telefono: string;
  @IsString()
  direccion: string;
}
