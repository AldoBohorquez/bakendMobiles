import { EstudianteEntity } from 'src/estudiantes/entities/estudiante.entity';

export class responseResponsableDto {
  id_responsable: number;
  nombre: string;
  parentesco: string;
  ruta_foto: string;
  estudiante: EstudianteEntity;
}
