import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './entities/estudiante.entity';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

export class EstudiantesRepository extends Repository<EstudianteEntity> {
  constructor(
    @InjectRepository(EstudianteEntity)
    repository: Repository<EstudianteEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findAll(): Promise<EstudianteEntity[]> {
    return this.find();
  }

  findById(id: number): Promise<EstudianteEntity> {
    return this.findOne({ where: { id_estudiante: id } });
  }

  findByEmail(email: string): Promise<EstudianteEntity> {
    return this.findOne({ where: { email: email.toLowerCase() } });
  }
}
