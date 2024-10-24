import { Module } from '@nestjs/common';
import { ResponsablesService } from './responsables.service';
import { ResponsablesController } from './responsables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsableEntity } from './entities/responsable.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ResponsableRepository } from './responsables.repository';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ResponsableEntity]),
    EstudiantesModule,
    ResponsablesModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }),
  ],

  controllers: [ResponsablesController],
  providers: [ResponsablesService, ResponsableRepository],
  exports: [ResponsableRepository],
})
export class ResponsablesModule {}
