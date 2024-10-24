import { Repository } from 'typeorm';
import { TutoresEntity } from './entities/tutore.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TutoresRepository extends Repository<TutoresEntity> {
  constructor(
    @InjectRepository(TutoresEntity)
    repository: Repository<TutoresEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findTutores(): Promise<TutoresEntity[]> {
    return this.find();
  }

  async findById(id: number): Promise<TutoresEntity> {
    return this.findOne({ where: { id_tutor: id } });
  }

  async findByEmail(email: string): Promise<TutoresEntity> {
    return this.findOne({ where: { correo: email } });
  }
}
