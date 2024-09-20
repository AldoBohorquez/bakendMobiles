import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudiantesRepository } from './estudiantes.repository';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(EstudiantesRepository)
    private readonly estudiantesRepository: EstudiantesRepository,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto) {
    const verifyEmail = await this.estudiantesRepository.findByEmail(
      createEstudianteDto.email,
    );
    if (!verifyEmail) {
      return { message: 'El correo ya se encuentra registrado' };
    }
    const bodyEstudent = this.estudiantesRepository.create(createEstudianteDto);
    return await this.estudiantesRepository.save(bodyEstudent);
  }

  async findAll() {
    return await this.estudiantesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.estudiantesRepository.findById(id);
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
