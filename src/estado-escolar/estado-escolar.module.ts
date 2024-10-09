import { Module } from '@nestjs/common';
import { EstadoEscolarService } from './estado-escolar.service';
import { EstadoEscolarController } from './estado-escolar.controller';

@Module({
  controllers: [EstadoEscolarController],
  providers: [EstadoEscolarService],
})
export class EstadoEscolarModule {}
