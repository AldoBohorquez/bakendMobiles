import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AsistenciaEntity } from './entities/asistencia.entity';
import { AsistenciaRepository } from './asistencias.repository';
import { EstudiantesRepository } from 'src/estudiantes/estudiantes.repository';
import * as QRCode from 'qrcode';
import { EstudianteEntity } from 'src/estudiantes/entities/estudiante.entity';
@Injectable()
export class AsistenciasService {
  constructor(
    @InjectRepository(AsistenciaEntity)
    private readonly asistenciaRepository: AsistenciaRepository,
    @InjectRepository(EstudiantesRepository)
    private readonly estudianteRepository: EstudiantesRepository,
  ) {}
  async create(
    createAsistenciaDto: CreateAsistenciaDto,
  ): Promise<AsistenciaEntity> {
    const findEstudiante = await this.estudianteRepository.findById(
      createAsistenciaDto.id_estudiante,
    );
    if (!findEstudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    const bodyAsistencia =
      this.asistenciaRepository.create(createAsistenciaDto);
    bodyAsistencia.estudiante = findEstudiante;
    bodyAsistencia.fecha_asistencia = new Date();
    const qrBuffer = await this.generateQr(bodyAsistencia.estudiante);
    bodyAsistencia.codigo_qr = qrBuffer;
    return await this.asistenciaRepository.save(bodyAsistencia);
  }

  async findAll(): Promise<AsistenciaEntity[] | NotFoundException> {
    const asistenciasFind = await this.asistenciaRepository.findAll();
    if (!asistenciasFind) {
      return new NotFoundException('Asistencias no encontradas');
    }
    return asistenciasFind;
  }

  async findOne(id: number): Promise<AsistenciaEntity | NotFoundException> {
    const asistenciFind = await this.asistenciaRepository.findById(id);
    if (!asistenciFind) {
      return new NotFoundException('Asistencia no encontrada');
    }
    return asistenciFind;
  }

  async update(
    id: number,
    updateAsistenciaDto: UpdateAsistenciaDto,
  ): Promise<AsistenciaEntity | { message: string }> {
    if (!this.comprobarExistencia(id)) {
      return { message: 'Asistencia no encontrada' };
    }
    const bodyUpdate =
      await this.asistenciaRepository.create(updateAsistenciaDto);
    const asistenciaUpdate = await this.asistenciaRepository.update(
      id,
      bodyUpdate,
    );
    if (!asistenciaUpdate) {
      return { message: 'Error al actualizar' };
    }
    return asistenciaUpdate.raw;
  }

  async remove(id: number): Promise<AsistenciaEntity | { message: string }> {
    const asistenciaFind = await this.asistenciaRepository.findById(id);
    if (!asistenciaFind) {
      return { message: 'Asistencia no encontrada' };
    }
    return await this.asistenciaRepository.remove(asistenciaFind);
  }

  comprobarExistencia(id: number): Promise<AsistenciaEntity> {
    return this.asistenciaRepository.findById(id);
  }

  async generateQr(estudiante: EstudianteEntity): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      QRCode.toBuffer(estudiante.id_estudiante.toString(), (err, buffer) => {
        if (err) reject(err);
        resolve(buffer);
      });
    });
  }
}
