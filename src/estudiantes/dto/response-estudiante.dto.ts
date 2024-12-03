import { EstadoEscolarEntity } from 'src/estado-escolar/entities/estado-escolar.entity';
import { ResponsableEntity } from 'src/responsables/entities/responsable.entity';
import { TutoresEntity } from 'src/tutores/entities/tutore.entity';

export class ResponseEstudianteDto {
  id_estudiante: number;
  nombre: string;

  apellidoP: string;

  apellidoM: string;
  fecha_nacimiento: Date;
  direccion: string;
  tutor: TutoresEntity;
  estado_escolar: EstadoEscolarEntity;
  responsables: ResponsableEntity[];
  ruta_foto: string;
}
