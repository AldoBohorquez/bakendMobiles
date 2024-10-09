import { AsistenciaEntity } from 'src/asistencias/entities/asistencia.entity';
import { EstudianteEntity } from 'src/estudiantes/entities/estudiante.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('estado_escolar')
export class EstadoEscolarEntity {
  @PrimaryGeneratedColumn()
  id_estado: number;

  @Column()
  estado: string;

  @Column({ type: 'date' })
  fecha_estado: Date;

  @ManyToOne(() => AsistenciaEntity, (asistencia) => asistencia.estado_escolar)
  asistencia: AsistenciaEntity;
}
