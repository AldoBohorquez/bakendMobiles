import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesRepository } from './estudiantes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './entities/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity])],
  controllers: [EstudiantesController],
  providers: [EstudiantesService, EstudiantesRepository],
  exports: [EstudiantesService],
})
export class EstudiantesModule {}
