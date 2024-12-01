import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { CreateTutoreDto } from './dto/create-tutore.dto';
import { UpdateTutoreDto } from './dto/update-tutore.dto';
import { IsProfile } from 'src/auth/jwt/profile.decorator';
import { PerfilesEnum } from 'src/usuarios/dto/perfiles.enum';

@Controller('tutores')
export class TutoresController {
  constructor(private readonly tutoresService: TutoresService) {}

  @Post()
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
  create(@Body() createTutoreDto: CreateTutoreDto) {
    try {
      return this.tutoresService.create(createTutoreDto);
    } catch (error) {
      throw new HttpException(
        'Error al crear el tutor',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get()
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
  findAll() {
    try {
      return this.tutoresService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error al obtener los tutores',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get(':id')
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
  findOne(@Param('id') id: string) {
    try {
      return this.tutoresService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        'Error al obtener el tutor',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get(':id/estudiantes')
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
  findEstudiantes(@Param('id') id: string) {
    try {
      return this.tutoresService.findEstudiantes(+id);
    } catch (error) {
      throw new HttpException(
        'Error al obtener los estudiantes del tutor',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Patch(':id')
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
  update(@Param('id') id: string, @Body() updateTutoreDto: UpdateTutoreDto) {
    try {
      return this.tutoresService.update(+id, updateTutoreDto);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el tutor',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Delete(':id')
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
  remove(@Param('id') id: string) {
    try {
      return this.tutoresService.remove(+id);
    } catch (error) {
      throw new HttpException(
        'Error al eliminar el tutor',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }
}
