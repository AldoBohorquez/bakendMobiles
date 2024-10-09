import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoEscolarService } from './estado-escolar.service';
import { CreateEstadoEscolarDto } from './dto/create-estado-escolar.dto';
import { UpdateEstadoEscolarDto } from './dto/update-estado-escolar.dto';

@Controller('estado-escolar')
export class EstadoEscolarController {
  constructor(private readonly estadoEscolarService: EstadoEscolarService) {}

  @Post()
  create(@Body() createEstadoEscolarDto: CreateEstadoEscolarDto) {
    return this.estadoEscolarService.create(createEstadoEscolarDto);
  }

  @Get()
  findAll() {
    return this.estadoEscolarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoEscolarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoEscolarDto: UpdateEstadoEscolarDto) {
    return this.estadoEscolarService.update(+id, updateEstadoEscolarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoEscolarService.remove(+id);
  }
}
