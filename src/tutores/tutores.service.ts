import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTutoreDto } from './dto/create-tutore.dto';
import { UpdateTutoreDto } from './dto/update-tutore.dto';
import { TutoresRepository } from './tutores.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TutoresEntity } from './entities/tutore.entity';
import { LoginTutoresDto } from './dto/tutores.dto';

@Injectable()
export class TutoresService {
  constructor(
    @InjectRepository(TutoresRepository)
    private readonly tutoresrepository: TutoresRepository,
  ) {}
  async create(createTutoreDto: CreateTutoreDto): Promise<TutoresEntity> {
    const veryfyEmail = await this.tutoresrepository.findByEmail(
      createTutoreDto.correo,
    );
    if (veryfyEmail) {
      throw new ConflictException('El correo ya existe');
    }
    const bodyTutor = this.tutoresrepository.create(createTutoreDto);
    bodyTutor.contrasena = await this.encryptPassword(bodyTutor.contrasena);
    return this.tutoresrepository.save(bodyTutor);
  }

  async findAll(): Promise<TutoresEntity[] | NotFoundException> {
    const tutores = await this.tutoresrepository.findTutores();
    if (!tutores) {
      throw new NotFoundException('No hay tutores registrados');
    }
    return tutores;
  }

  async findOne(id: number): Promise<TutoresEntity | NotFoundException> {
    const tutor = await this.tutoresrepository.findById(id);
    if (!tutor) {
      throw new NotFoundException('Tutor no encontrado');
    }
    return tutor;
  }

  async findByEmail(correo: string): Promise<TutoresEntity> {
    const tutor = await this.tutoresrepository.findByEmail(correo);
    if (!tutor) {
      throw new NotFoundException('Tutor no encontrado');
    }
    return tutor;
  }

  async update(
    id: number,
    updateTutoreDto: UpdateTutoreDto,
  ): Promise<TutoresEntity | NotFoundException> {
    const bodyUpdate = this.tutoresrepository.create(updateTutoreDto);
    const tutorUpdate = await this.tutoresrepository.update(id, bodyUpdate);
    if (!tutorUpdate) {
      return new NotFoundException('Tutor no encontrado');
    }
    return tutorUpdate.raw;
  }

  async remove(id: number): Promise<TutoresEntity | NotFoundException> {
    const tutorDelete = await this.tutoresrepository.findById(id);
    if (!tutorDelete) {
      return new NotFoundException('Tutor no encontrado');
    }
    return tutorDelete;
  }

  async findById(id: number): Promise<TutoresEntity> {
    const tutor = await this.tutoresrepository.findById(id);
    if (!tutor) {
      throw new NotFoundException('Tutor no encontrado');
    }
    return tutor;
  }

  async loginTutor(
    loginTutorDto: LoginTutoresDto,
  ): Promise<TutoresEntity | NotFoundException> {
    const tutor = await this.tutoresrepository.findByEmail(
      loginTutorDto.correo,
    );
    if (!tutor) {
      return new NotFoundException('Correo no encontrado');
    }
    const bcrypt = require('bcrypt');
    const match = await bcrypt.compare(
      loginTutorDto.contrasena,
      tutor.contrasena,
    );
    if (match) {
      return tutor;
    }
    return new NotFoundException('Contraseña incorrecta');
  }

  async encryptPassword(password: string): Promise<string> {
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}
