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
import { EstadoEscolarService } from './estado-escolar.service';
import { CreateEstadoEscolarDto } from './dto/create-estado-escolar.dto';
import { UpdateEstadoEscolarDto } from './dto/update-estado-escolar.dto';

@Controller('estado-escolar')
export class EstadoEscolarController {
  constructor(private readonly estadoEscolarService: EstadoEscolarService) {}

  @Post()
  create(@Body() createEstadoEscolarDto: CreateEstadoEscolarDto) {
    try {
      return this.estadoEscolarService.create(createEstadoEscolarDto);
    } catch (error) {
      throw new HttpException(
        'Error al crear el estado escolar',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.estadoEscolarService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error al obtener los estados escolares',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.estadoEscolarService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        'Error al obtener el estado escolar',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstadoEscolarDto: UpdateEstadoEscolarDto,
  ) {
    try {
      return this.estadoEscolarService.update(+id, updateEstadoEscolarDto);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el estado escolar',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.estadoEscolarService.remove(+id);
    } catch (error) {
      throw new HttpException(
        'Error al eliminar el estado escolar',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }
}
