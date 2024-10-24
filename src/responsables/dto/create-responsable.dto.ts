import { IsNumber, IsString } from 'class-validator';

export class CreateResponsableDto {
  @IsString()
  nombre: string;

  @IsString()
  parentesco: string;

  @IsNumber()
  id_estudiante: number;
}
