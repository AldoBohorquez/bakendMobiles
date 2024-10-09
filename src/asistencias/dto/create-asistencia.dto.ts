import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateAsistenciaDto {
  @IsDate()
  fecha_asistencia?: Date;
  @IsNumber()
  id_estudiante: number;
}
