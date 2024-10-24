import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudiantesRepository } from './estudiantes.repository';
import { EstudianteEntity } from './entities/estudiante.entity';
import { TutoresRepository } from 'src/tutores/tutores.repository';
import { SocketsAdminGateway } from '../sockets-admin/sockets-admin.gateway';
import { EventosAdmin } from 'src/sockets-admin/eventos-admin.enum';
import { PerfilesEnum } from 'src/usuarios/dto/perfiles.enum';
import { mkdirSync, writeFileSync } from 'fs';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(EstudiantesRepository)
    private readonly estudiantesRepository: EstudiantesRepository,
    @InjectRepository(TutoresRepository)
    private readonly tutoresRepository: TutoresRepository,
    private readonly socketsAdminGateway: SocketsAdminGateway,
  ) {}

  async create(
    createEstudianteDto: CreateEstudianteDto,
    file: Express.Multer.File,
  ): Promise<EstudianteEntity | NotFoundException> {
    const bodyEstudent = this.estudiantesRepository.create(createEstudianteDto);
    bodyEstudent.tutor = await this.tutoresRepository.findById(
      createEstudianteDto.id_tutor,
    );
    const estudianteCreado =
      await this.estudiantesRepository.save(bodyEstudent);
    mkdirSync('./uploads/estudiantes/' + estudianteCreado.id_estudiante, {
      recursive: true,
    });
    const fotoEstudianteFolder =
      './uploads/estudiantes/' + estudianteCreado.id_estudiante + '/foto.jpg';
    if (file) {
      writeFileSync(fotoEstudianteFolder, file.buffer);
    }
    this.socketsAdminGateway.emit(
      PerfilesEnum.ADMIN,
      EventosAdmin.estudiante_creado,
      {
        nombre: estudianteCreado.nombre,
      },
    );
    return estudianteCreado;
  }

  async findAll(): Promise<EstudianteEntity[] | { message: string }> {
    const usersFind = await this.estudiantesRepository.findAll();
    if (!usersFind) {
      return { message: 'No hay estudiantes registrados' };
    }
    return usersFind;
  }

  async findOne(id: number): Promise<EstudianteEntity | { message: string }> {
    const userFind = await this.estudiantesRepository.findById(id);
    if (!userFind) {
      return { message: 'Estudiante no encontrado' };
    }
    return userFind;
  }

  async findOneByUuid(uuid: string): Promise<EstudianteEntity> {
    const userFind = await this.estudiantesRepository.findByUuid(uuid);
    return userFind;
  }

  async update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
  ): Promise<EstudianteEntity | { message: string }> {
    const bodyUpdate =
      await this.estudiantesRepository.create(updateEstudianteDto);
    const userUpdate = await this.estudiantesRepository.update(id, bodyUpdate);
    if (!userUpdate) {
      return { message: 'Estudiante no encontrado' };
    }
    return userUpdate.raw;
  }

  async remove(id: number): Promise<EstudianteEntity | { message: string }> {
    const userFind = await this.estudiantesRepository.findById(id);
    if (!userFind) {
      return { message: 'Estudiante no encontrado' };
    }
    return this.estudiantesRepository.remove(userFind);
  }
}
