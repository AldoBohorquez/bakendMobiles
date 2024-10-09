import { EstadoEscolarEntity } from 'src/estado-escolar/entities/estado-escolar.entity';
import { EstudianteEntity } from 'src/estudiantes/entities/estudiante.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('asistencias')
export class AsistenciaEntity {
  @PrimaryGeneratedColumn()
  id_asistencia: number;

  @Column()
  fecha_asistencia: Date;

  @Column({ type: 'bytea' })
  codigo_qr: Buffer;

  @OneToMany(() => EstadoEscolarEntity, (estado) => estado.asistencias, {
    nullable: true,
  })
  estado_escolar: EstadoEscolarEntity[];

  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.asistencias)
  estudiante: EstudianteEntity;
}
