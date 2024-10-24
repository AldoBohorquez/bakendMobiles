import { EstadoEscolarEntity } from 'src/estado-escolar/entities/estado-escolar.entity';
import { ResponsableEntity } from 'src/responsables/entities/responsable.entity';
import { TutoresEntity } from 'src/tutores/entities/tutore.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('estudiantes')
export class EstudianteEntity {
  @PrimaryGeneratedColumn()
  id_estudiante: number;

  @Column()
  @Generated('uuid')
  @Index()
  uuid: string;

  @Column()
  nombre: string;

  @Column()
  apellidoP: string;

  @Column()
  apellidoM: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column()
  direccion: string;

  @OneToMany(() => ResponsableEntity, (responsable) => responsable.estudiante, {
    nullable: true,
  })
  responsables: ResponsableEntity[];

  @ManyToOne(() => TutoresEntity, (tutor) => tutor.estudiantes)
  tutor: TutoresEntity;

  @ManyToOne(
    () => EstadoEscolarEntity,
    (estado_escolar) => estado_escolar.estudiantes,
  )
  estado_escolar: EstadoEscolarEntity;
}
