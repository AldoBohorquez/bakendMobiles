import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoEscolarDto } from './dto/create-estado-escolar.dto';
import { UpdateEstadoEscolarDto } from './dto/update-estado-escolar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { estadoEscolarRepository } from './estado-escolar.repository';
import { NotFoundError } from 'rxjs';
import { EstadoEscolarEntity } from './entities/estado-escolar.entity';
import { AsistenciaRepository } from '../asistencias/asistencias.repository';

@Injectable()
export class EstadoEscolarService {
  constructor(
    @InjectRepository(estadoEscolarRepository)
    private readonly estadoEscolarRepository: estadoEscolarRepository,
    @InjectRepository(AsistenciaRepository)
    private readonly asistenciaRepository: AsistenciaRepository,
  ) {}
  async create(
    createEstadoEscolarDto: CreateEstadoEscolarDto,
  ): Promise<EstadoEscolarEntity> {
    const findAsistencia = await this.asistenciaRepository.findById(
      createEstadoEscolarDto.id_asistencia,
    );
    if (!findAsistencia) {
      throw new NotFoundException('Asistencia no encontrada');
    }
    const bodyEstadoEscolar = this.estadoEscolarRepository.create(
      createEstadoEscolarDto,
    );
    bodyEstadoEscolar.asistencia = findAsistencia;
    return this.estadoEscolarRepository.save(bodyEstadoEscolar);
  }

  async findAll(): Promise<EstadoEscolarEntity[] | NotFoundException> {
    const estadosEscolares = await this.estadoEscolarRepository.findAll();
    if (!estadosEscolares) {
      return new NotFoundException('No hay estados escolares registrados');
    }
  }

  async findOne(id: number): Promise<EstadoEscolarEntity | NotFoundException> {
    const estadoEscolar = await this.estadoEscolarRepository.findById(id);
    if (!estadoEscolar) {
      return new NotFoundException('Estado escolar no encontrado');
    }
    return new NotFoundException('Estado escolar no encontrado');
  }

  async update(
    id: number,
    updateEstadoEscolarDto: UpdateEstadoEscolarDto,
  ): Promise<EstadoEscolarEntity | NotFoundException> {
    const bodyEstadoescolar = this.estadoEscolarRepository.create(
      updateEstadoEscolarDto,
    );
    const estadoEscolar = await this.estadoEscolarRepository.update(
      id,
      bodyEstadoescolar,
    );
    if (!estadoEscolar) {
      return new NotFoundException('Estado escolar no encontrado');
    }
    return estadoEscolar.raw;
  }

  async remove(id: number): Promise<EstadoEscolarEntity | NotFoundException> {
    const estadoEscolar = await this.estadoEscolarRepository.findById(id);
    if (!estadoEscolar) {
      return new NotFoundException('Estado escolar no encontrado');
    }
    return this.estadoEscolarRepository.remove(estadoEscolar);
  }
}
