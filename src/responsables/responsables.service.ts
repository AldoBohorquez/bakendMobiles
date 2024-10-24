import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsableEntity } from './entities/responsable.entity';
import { EstudiantesRepository } from 'src/estudiantes/estudiantes.repository';
import { ResponsableRepository } from './responsables.repository';

@Injectable()
export class ResponsablesService {
  constructor(
    @InjectRepository(ResponsableRepository)
    private responsableRepository: ResponsableRepository,
    @InjectRepository(EstudiantesRepository)
    private estudianteRepository: EstudiantesRepository,
  ) {}
  async create(
    createResponsableDto: CreateResponsableDto,
    file: Express.Multer.File,
  ): Promise<ResponsableEntity | NotFoundException> {
    const findEstudiante = await this.estudianteRepository.findById(
      createResponsableDto.id_estudiante,
    );
    if (!findEstudiante) {
      return new NotFoundException('Estudiante no encontrado');
    }
    const bodyResponsable =
      this.responsableRepository.create(createResponsableDto);
    bodyResponsable.foto = file ? file.filename : null;
    bodyResponsable.estudiante = findEstudiante;
    return await this.responsableRepository.save(bodyResponsable);
  }

  async findAll(): Promise<ResponsableEntity[] | NotFoundException> {
    const responsables = await this.responsableRepository.find();
    if (!responsables) {
      return new NotFoundException('No hay responsables');
    }
    return responsables;
  }

  async findOne(id: number): Promise<ResponsableEntity | NotFoundException> {
    const responsable = await this.responsableRepository.findById(id);
    if (!responsable) {
      return new NotFoundException('Responsable no encontrado');
    }
    return responsable;
  }

  async update(
    id: number,
    updateResponsableDto: UpdateResponsableDto,
  ): Promise<ResponsableEntity | NotFoundException> {
    const findResponsable = await this.responsableRepository.findById(id);
    if (!findResponsable) {
      return new NotFoundException('Responsable no encontrado');
    }
    await this.responsableRepository.update(
      findResponsable,
      updateResponsableDto,
    );
  }

  async remove(id: number): Promise<ResponsableEntity | NotFoundException> {
    const responsable = await this.responsableRepository.findById(id);
    if (!responsable) {
      return new NotFoundException('Responsable no encontrado');
    }
    return await this.responsableRepository.remove(responsable);
  }
}
