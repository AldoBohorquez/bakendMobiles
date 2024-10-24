import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEstadoEscolarDto {
  @IsString()
  estado: string;
  @IsNumber()
  id_estudiante: number;
}
