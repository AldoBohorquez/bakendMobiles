import {
  Column,
  CreateDateColumn,
  Entity,
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
}
