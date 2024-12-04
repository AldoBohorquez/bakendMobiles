import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstadoEscolarDto } from './dto/create-estado-escolar.dto';
import { UpdateEstadoEscolarDto } from './dto/update-estado-escolar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { estadoEscolarRepository } from './estado-escolar.repository';
import { EstadoEscolarEntity } from './entities/estado-escolar.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';

@Injectable()
export class EstadoEscolarService {
  constructor(
    @InjectRepository(estadoEscolarRepository)
    private readonly estadoEscolarRepository: estadoEscolarRepository,
    @Inject(forwardRef(() => EstudiantesService))
    private readonly estudianteService: EstudiantesService,
  ) {}
  async create(
    createEstadoEscolarDto: CreateEstadoEscolarDto,
  ): Promise<EstadoEscolarEntity> {
    const findEstudiante = await this.estudianteService.findEstudianteEntity(
      createEstadoEscolarDto.id_estudiante,
    );
    if (!findEstudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    const bodyEstadoEscolar = this.estadoEscolarRepository.create(
      createEstadoEscolarDto,
    );
    bodyEstadoEscolar.fecha_estado = new Date();
    bodyEstadoEscolar.estudiantes = findEstudiante;
    return this.estadoEscolarRepository.save(bodyEstadoEscolar);
  }

  async findAll(): Promise<EstadoEscolarEntity[]> {
    const estadosEscolares = await this.estadoEscolarRepository.findAll();
    return estadosEscolares;
  }

  async findOne(id: number): Promise<EstadoEscolarEntity> {
    const estadoEscolar = await this.estadoEscolarRepository.findById(id);
    if (!estadoEscolar) {
      throw new NotFoundException('Estado escolar no encontrado');
    }
    return estadoEscolar;
  }

  async update(
    id: number,
    updateEstadoEscolarDto: UpdateEstadoEscolarDto,
  ): Promise<EstadoEscolarEntity | NotFoundException> {
    if (this.findOne(id)) {
      throw new NotFoundException('Estado escolar no encontrado');
    }
    const bodyEstadoescolar = this.estadoEscolarRepository.create(
      updateEstadoEscolarDto,
    );
    const estadoEscolar = await this.estadoEscolarRepository.update(
      id,
      bodyEstadoescolar,
    );
    return estadoEscolar.raw;
  }

  async remove(id: number): Promise<EstadoEscolarEntity> {
    const estadoEscolar = await this.estadoEscolarRepository.findById(id);
    if (!estadoEscolar) {
      throw new NotFoundException('Estado escolar no encontrado');
    }
    return this.estadoEscolarRepository.remove(estadoEscolar);
  }
}
