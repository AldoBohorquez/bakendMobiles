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

  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.estado_escolar)
  estudiantes: EstudianteEntity;
}
