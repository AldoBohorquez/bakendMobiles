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
export class ResponsablesController {
  constructor(private readonly responsablesService: ResponsablesService) {}

  @Post()
  @IsProfile(PerfilesEnum.ADMIN)
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
  @IsProfile(PerfilesEnum.ADMIN)
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
  @IsProfile(PerfilesEnum.ADMIN)
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
  @IsProfile(PerfilesEnum.ADMIN)
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
  @IsProfile(PerfilesEnum.ADMIN)
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
