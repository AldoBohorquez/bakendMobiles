import { AsistenciaEntity } from 'src/asistencias/entities/asistencia.entity';
import { EstadoEscolarEntity } from 'src/estado-escolar/entities/estado-escolar.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

Entity('estudiantes');
export class EstudianteEntity {
  @PrimaryGeneratedColumn()
  id_estudiante: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column()
  email: string;

  @Column({ type: 'varchar', length: 10 })
  telefono: string;

  @Column()
  direccion: string;

  @OneToMany(() => AsistenciaEntity, (asistencia) => asistencia.estudiante, {
    nullable: true,
  })
  asistencias: AsistenciaEntity[];
}
