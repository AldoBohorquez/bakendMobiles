import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesRepository } from './estudiantes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './entities/estudiante.entity';
import { TutoresModule } from 'src/tutores/tutores.module';
import { EstadoEscolarModule } from 'src/estado-escolar/estado-escolar.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstudianteEntity]),
    TutoresModule,
    EstadoEscolarModule,
  ],
  controllers: [EstudiantesController],
  providers: [EstudiantesService, EstudiantesRepository],
  exports: [EstudiantesService, EstudiantesRepository],
})
export class EstudiantesModule {}
