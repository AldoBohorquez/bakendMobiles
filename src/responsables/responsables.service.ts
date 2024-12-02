import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsableEntity } from './entities/responsable.entity';
import { ResponsableRepository } from './responsables.repository';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { mkdir, mkdirSync, writeFileSync } from 'fs';
import { UpdateResult } from 'typeorm';
import { responseResponsableDto } from './dto/response-responsable.dto';

@Injectable()
export class ResponsablesService {
  constructor(
    @InjectRepository(ResponsableRepository)
    private responsableRepository: ResponsableRepository,
    private estudiantesService: EstudiantesService,
  ) {}
  async create(
    createResponsableDto: CreateResponsableDto,
    file: Express.Multer.File,
  ): Promise<ResponsableEntity> {
    const findEstudiante = await this.estudiantesService.findEstudianteEntity(
      Number(createResponsableDto.id_estudiante),
    );
    if (!findEstudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    const bodyResponsable =
      this.responsableRepository.create(createResponsableDto);
    bodyResponsable.estudiante = findEstudiante;
    const responsableSave =
      await this.responsableRepository.save(bodyResponsable);
    mkdirSync('./uploads/responsables/' + responsableSave.id_responsable, {
      recursive: true,
    });

    const fotoReponsableFolder =
      './uploads/responsables/' + responsableSave.id_responsable + '/foto.jpg';
    if (file) {
      writeFileSync(fotoReponsableFolder, file.buffer);
    }
    return responsableSave;
  }

  async findAll(): Promise<responseResponsableDto[]> {
    const responsables = await this.responsableRepository.find();
    const responseResponsables = responsables.map((responsable) => {
      return {
        id_responsable: responsable.id_responsable,
        nombre: responsable.nombre,
        parentesco: responsable.parentesco,
        ruta_foto: 'responsables/' + responsable.id_responsable + '/foto.jpg',
        estudiante: responsable.estudiante,
      };
    });
    return responseResponsables;
  }

  async findOne(id: number): Promise<responseResponsableDto> {
    const responsable = await this.responsableRepository.findById(id);
    if (!responsable) {
      throw new NotFoundException('Responsable no encontrado');
    }
    return {
      id_responsable: responsable.id_responsable,
      nombre: responsable.nombre,
      parentesco: responsable.parentesco,
      ruta_foto: 'responsables/' + responsable.id_responsable + '/foto.jpg',
      estudiante: responsable.estudiante,
    };
  }

  async update(
    id: number,
    updateResponsableDto: UpdateResponsableDto,
  ): Promise<UpdateResult> {
    const findResponsable = await this.responsableRepository.findById(id);
    if (!findResponsable) {
      throw new NotFoundException('Responsable no encontrado');
    }
    return await this.responsableRepository.update(
      findResponsable,
      updateResponsableDto,
    );
  }

  async remove(id: number): Promise<ResponsableEntity> {
    const responsable = await this.responsableRepository.findById(id);
    if (!responsable) {
      throw new NotFoundException('Responsable no encontrado');
    }
    return await this.responsableRepository.remove(responsable);
  }
}
