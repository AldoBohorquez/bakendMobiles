import { Module } from '@nestjs/common';
import { ResponsablesService } from './responsables.service';
import { ResponsablesController } from './responsables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsableEntity } from './entities/responsable.entity';
import { ResponsableRepository } from './responsables.repository';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ResponsableEntity]),
    EstudiantesModule,
    ResponsablesModule,
  ],

  controllers: [ResponsablesController],
  providers: [ResponsablesService, ResponsableRepository],
  exports: [ResponsableRepository],
})
export class ResponsablesModule {}
