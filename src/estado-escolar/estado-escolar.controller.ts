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
import { IsProfile } from 'src/auth/jwt/profile.decorator';
import { PerfilesEnum } from 'src/usuarios/dto/perfiles.enum';

@Controller('estado-escolar')
export class EstadoEscolarController {
  constructor(private readonly estadoEscolarService: EstadoEscolarService) {}

  @Post()
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
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
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
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
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
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
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
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
  @IsProfile(PerfilesEnum.SUPER, PerfilesEnum.ADMIN)
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