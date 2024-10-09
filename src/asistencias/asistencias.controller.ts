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
import { AsistenciasService } from './asistencias.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @Post()
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    try {
      return this.asistenciasService.create(createAsistenciaDto);
    } catch (error) {
      return new HttpException(
        'Error al crear la asistencia',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.asistenciasService.findAll();
    } catch (error) {
      return new HttpException(
        'Error al obtener las asistencias',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.asistenciasService.findOne(+id);
    } catch (error) {
      return new HttpException(
        'Error al obtener la asistencia',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAsistenciaDto: UpdateAsistenciaDto,
  ) {
    try {
      return this.asistenciasService.update(+id, updateAsistenciaDto);
    } catch (error) {
      return new HttpException(
        'Error al actualizar la asistencia',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.asistenciasService.remove(+id);
    } catch (error) {
      return new HttpException(
        'Error al eliminar la asistencia',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }
}
