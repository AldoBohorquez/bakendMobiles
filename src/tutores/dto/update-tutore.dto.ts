import { PartialType } from '@nestjs/mapped-types';
import { CreateTutoreDto } from './create-tutore.dto';
import { IsString } from 'class-validator';

export class UpdateTutoreDto extends PartialType(CreateTutoreDto) {
  @IsString()
  nombre: string;

  @IsString()
  correo: string;

  @IsString()
  contrasena: string;
}
