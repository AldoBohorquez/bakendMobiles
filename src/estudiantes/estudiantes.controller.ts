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
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { SyslogInclude } from 'src/syslog/interceptors/syslog-include.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Public } from 'src/auth/jwt/public.decorator';
import { IsProfile } from 'src/auth/jwt/profile.decorator';
import { PerfilesEnum } from 'src/usuarios/dto/perfiles.enum';

@Controller('estudiantes')
@IsProfile(PerfilesEnum.ADMIN, PerfilesEnum.TUTOR)
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  @SyslogInclude('Crear estudiante')
  @UseInterceptors(FileInterceptor('foto'))
  create(
    @Body() createEstudianteDto: CreateEstudianteDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return this.estudiantesService.create(createEstudianteDto, file);
    } catch (error) {
      throw new HttpException(
        'Error al crear el estudiante',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get('imagen/:id')
  async getImagen(@Param('id') id: string) {
    try {
      return this.estudiantesService.imageEstudiante(+id);
    } catch (error) {
      throw new HttpException(
        'Error al obtener la imagen del estudiante',
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

  @Get('tutor/:id')
  findAllByTutor(@Param('id') id: string) {
    try {
      return this.estudiantesService.findAllByTutor(+id);
    } catch (error) {
      throw new HttpException(
        'Error al obtener los estudiantes del tutor',
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

  @Public()
  @Get(':uuid/foto.jpg')
  async fotoEstudiante(@Param('uuid') uuid: string, @Res() res: Response) {
    try {
      return this.estudiantesService.findFotoEstudiante(uuid, res);
    } catch (error) {
      throw new HttpException(
        'Error al obtener la foto del estudiante',
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
