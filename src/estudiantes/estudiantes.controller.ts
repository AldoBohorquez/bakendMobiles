import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { IsProfile } from 'src/auth/jwt/profile.decorator';
import { PerfilesEnum } from 'src/usuarios/dto/perfiles.enum';
import { SyslogInclude } from 'src/syslog/interceptors/syslog-include.decorator';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
  @SyslogInclude('Crear estudiante')
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    try {
      return this.estudiantesService.create(createEstudianteDto);
    } catch (error) {
      throw new HttpException(
        'Error al crear el estudiante',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.estudiantesService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error al obtener los estudiantes',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.estudiantesService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        'Error al obtener el estudiante',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
  ) {
    try {
      return this.estudiantesService.update(+id, updateEstudianteDto);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el estudiante',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.estudiantesService.remove(+id);
    } catch (error) {
      throw new HttpException(
        'Error al eliminar el estudiante',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }
}
