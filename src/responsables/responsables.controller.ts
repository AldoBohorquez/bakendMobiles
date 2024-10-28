import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponsablesService } from './responsables.service';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsProfile } from 'src/auth/jwt/profile.decorator';
import { PerfilesEnum } from 'src/usuarios/dto/perfiles.enum';

@Controller('responsables')
@IsProfile(PerfilesEnum.ADMIN, PerfilesEnum.TUTOR)
export class ResponsablesController {
  constructor(private readonly responsablesService: ResponsablesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto'))
  create(
    @Body() createResponsableDto: CreateResponsableDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return this.responsablesService.create(createResponsableDto, file);
    } catch (error) {
      throw new HttpException(
        'Error al crear el responsable',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.responsablesService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error al obtener los responsables',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.responsablesService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        'Error al obtener el responsable',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResponsableDto: UpdateResponsableDto,
  ) {
    try {
      return this.responsablesService.update(+id, updateResponsableDto);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el responsable',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.responsablesService.remove(+id);
    } catch (error) {
      throw new HttpException(
        'Error al eliminar el responsable',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }
}
