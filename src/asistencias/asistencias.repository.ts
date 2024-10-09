import { Repository } from 'typeorm';
import { AsistenciaEntity } from './entities/asistencia.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class AsistenciaRepository extends Repository<AsistenciaEntity> {
  constructor(
    @InjectRepository(AsistenciaEntity)
    repository: Repository<AsistenciaEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findAll(): Promise<AsistenciaEntity[]> {
    return this.find();
  }

  findById(id: number): Promise<AsistenciaEntity> {
    return this.findOne({ where: { id_asistencia: id } });
  }

  findByDate(date: Date): Promise<AsistenciaEntity> {
    return this.findOne({ where: { fecha_asistencia: date } });
  }
}
