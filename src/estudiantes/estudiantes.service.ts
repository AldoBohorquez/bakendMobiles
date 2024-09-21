import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudiantesRepository } from './estudiantes.repository';
import { EstudianteEntity } from './entities/estudiante.entity';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(EstudiantesRepository)
    private readonly estudiantesRepository: EstudiantesRepository,
  ) {}

  async create(
    createEstudianteDto: CreateEstudianteDto,
  ): Promise<EstudianteEntity | { message: string }> {
    const verifyEmail = await this.estudiantesRepository.findByEmail(
      createEstudianteDto.email,
    );
    if (!verifyEmail) {
      return { message: 'El correo ya se encuentra registrado' };
    }
    const bodyEstudent = this.estudiantesRepository.create(createEstudianteDto);
    return await this.estudiantesRepository.save(bodyEstudent);
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
