import { Repository } from 'typeorm';
import { ResponsableEntity } from './entities/responsable.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ResponsableRepository extends Repository<ResponsableEntity> {
  constructor(
    @InjectRepository(ResponsableEntity)
    repository: Repository<ResponsableEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findAll(): Promise<ResponsableEntity[]> {
    return this.find();
  }

  findById(id: number): Promise<ResponsableEntity> {
    return this.findOne({ where: { id_responsable: id } });
  }
}
