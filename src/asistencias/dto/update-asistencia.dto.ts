import { PartialType } from '@nestjs/mapped-types';
import { CreateAsistenciaDto } from './create-asistencia.dto';
import { IsDate, IsString } from 'class-validator';

export class UpdateAsistenciaDto extends PartialType(CreateAsistenciaDto) {
  @IsDate()
  fecha_asistencia: Date;
}
