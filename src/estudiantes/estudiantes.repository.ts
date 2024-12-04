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
    return this.find({
      relations: ['tutor', 'estado_escolar', 'responsables'],
    });
  }

  findById(id: number): Promise<EstudianteEntity> {
    return this.findOne({
      where: { id_estudiante: id },
      relations: ['tutor', 'estado_escolar', 'responsables'],
    });
  }

  findByUuid(uuid: string): Promise<EstudianteEntity> {
    return this.findOne({
      where: { uuid: uuid },
      relations: ['tutor', 'estado_escolar', 'responsables'],
    });
  }

  findAllByTutor(idTutor: number): Promise<EstudianteEntity[]> {
    return this.find({
      where: { tutor: { id_tutor: idTutor } },
      relations: ['tutor', 'estado_escolar', 'responsables'],
      order: {
        estado_escolar: {
          id_estado: 'ASC',
        },
      },
    });
  }
}
