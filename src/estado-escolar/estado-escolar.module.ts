import { forwardRef, Module } from '@nestjs/common';
import { EstadoEscolarService } from './estado-escolar.service';
import { EstadoEscolarController } from './estado-escolar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEscolarEntity } from './entities/estado-escolar.entity';
import { estadoEscolarRepository } from './estado-escolar.repository';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstadoEscolarEntity]),
    forwardRef(() => EstudiantesModule),
  ],
  controllers: [EstadoEscolarController],
  providers: [EstadoEscolarService, estadoEscolarRepository],
  exports: [EstadoEscolarService],
})
export class EstadoEscolarModule {}
