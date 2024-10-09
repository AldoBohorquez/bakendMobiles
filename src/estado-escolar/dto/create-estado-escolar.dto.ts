import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEstadoEscolarDto {
  @IsString()
  estado: string;
  @IsDate()
  fecha_estado: Date;
  @IsNumber()
  id_asistencia: number;
}
