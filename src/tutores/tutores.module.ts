import { Module } from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { TutoresController } from './tutores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutoresEntity } from './entities/tutore.entity';
import { TutoresRepository } from './tutores.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TutoresEntity])],
  controllers: [TutoresController],
  providers: [TutoresService, TutoresRepository],
  exports: [TutoresRepository, TutoresService],
})
export class TutoresModule {}
