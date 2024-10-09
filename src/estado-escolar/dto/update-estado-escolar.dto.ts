import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoEscolarDto } from './create-estado-escolar.dto';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateEstadoEscolarDto extends PartialType(
  CreateEstadoEscolarDto,
) {
  @IsString()
  estado: string;
  @IsDate()
  fecha_estado: Date;
}
