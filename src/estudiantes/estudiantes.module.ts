import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesRepository } from './estudiantes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './entities/estudiante.entity';
import { TutoresModule } from 'src/tutores/tutores.module';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity]), TutoresModule],
  controllers: [EstudiantesController],
  providers: [EstudiantesService, EstudiantesRepository],
  exports: [EstudiantesService, EstudiantesRepository],
})
export class EstudiantesModule {}
