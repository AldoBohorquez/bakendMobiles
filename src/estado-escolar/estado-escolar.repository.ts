import { Repository } from 'typeorm';
import { EstadoEscolarEntity } from './entities/estado-escolar.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class estadoEscolarRepository extends Repository<EstadoEscolarEntity> {
  constructor(
    @InjectRepository(EstadoEscolarEntity)
    repository: Repository<EstadoEscolarEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findAll(): Promise<EstadoEscolarEntity[]> {
    return this.find();
  }

  findById(id: number): Promise<EstadoEscolarEntity> {
    return this.findOne({ where: { id_estado: id } });
  }

  findByEstado(estado: string): Promise<EstadoEscolarEntity> {
    return this.findOne({ where: { estado: estado } });
  }
}
