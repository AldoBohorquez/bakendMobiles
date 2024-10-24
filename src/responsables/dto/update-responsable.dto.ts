import { PartialType } from '@nestjs/mapped-types';
import { CreateResponsableDto } from './create-responsable.dto';
import { IsString } from 'class-validator';

export class UpdateResponsableDto extends PartialType(CreateResponsableDto) {
  @IsString()
  nombre: string;

  @IsString()
  parentesco: string;
}
