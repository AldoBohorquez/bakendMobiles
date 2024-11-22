import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudiantesRepository } from './estudiantes.repository';
import { EstudianteEntity } from './entities/estudiante.entity';
import { SocketsAdminGateway } from '../sockets-admin/sockets-admin.gateway';
import { EventosAdmin } from 'src/sockets-admin/eventos-admin.enum';
import { PerfilesEnum } from 'src/usuarios/dto/perfiles.enum';
import { mkdirSync, writeFileSync } from 'fs';
import { IsProfile } from 'src/auth/jwt/profile.decorator';
import { TutoresService } from 'src/tutores/tutores.service';
import { Response } from 'express';

@Injectable()
@IsProfile(PerfilesEnum.ADMIN, PerfilesEnum.TUTOR)
export class EstudiantesService {
  constructor(
    @InjectRepository(EstudiantesRepository)
    private readonly estudiantesRepository: EstudiantesRepository,
    private readonly tutoresService: TutoresService,
    private readonly socketsAdminGateway: SocketsAdminGateway,
  ) {}

  async create(
    createEstudianteDto: CreateEstudianteDto,
    file: Express.Multer.File,
  ): Promise<EstudianteEntity> {
    const bodyEstudent = this.estudiantesRepository.create(createEstudianteDto);
    bodyEstudent.tutor = await this.tutoresService.findById(
      createEstudianteDto.id_tutor,
    );
    bodyEstudent.fecha_nacimiento = new Date(createEstudianteDto.fecha_nacimiento);
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

  async findAll(): Promise<EstudianteEntity[]> {
    const usersFind = await this.estudiantesRepository.findAll();
    return usersFind;
  }

  async findOne(id: number): Promise<EstudianteEntity> {
    const userFind = await this.estudiantesRepository.findById(id);
    if (!userFind) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    return userFind;
  }

  async findOneByUuid(uuid: string): Promise<EstudianteEntity> {
    const userFind = await this.estudiantesRepository.findByUuid(uuid);
    if (!userFind) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    return userFind;
  }

  async update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
  ): Promise<EstudianteEntity> {
    const bodyUpdate =
      await this.estudiantesRepository.create(updateEstudianteDto);
    const userUpdate = await this.estudiantesRepository.update(id, bodyUpdate);
    return userUpdate.raw;
  }

  async remove(id: number): Promise<EstudianteEntity> {
    const userFind = await this.estudiantesRepository.findById(id);
    if (!userFind) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    return this.estudiantesRepository.remove(userFind);
  }

  async findFotoEstudiante(uuid: string, res: Response) {
    const estudiante = await this.estudiantesRepository.findByUuid(uuid);
    if (!estudiante) {
      throw new HttpException('Estudiante no encontrado', HttpStatus.NOT_FOUND);
    }
    const rutaFotoEstudiante = 'foto.jpg';
    return res.sendFile(rutaFotoEstudiante, {
      root: './uploads/estudiantes/' + estudiante.id_estudiante,
    });
  }
}
