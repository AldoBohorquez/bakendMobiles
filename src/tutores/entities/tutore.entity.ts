import { EstudianteEntity } from 'src/estudiantes/entities/estudiante.entity';
import { PerfilesEnum } from 'src/usuarios/dto/perfiles.enum';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tutores')
export class TutoresEntity {
  @PrimaryGeneratedColumn()
  id_tutor: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contrasena: string;

  @Column({
    type: 'enum',
    enum: [PerfilesEnum.TUTOR],
    default: PerfilesEnum.TUTOR,
  })
  perfil: PerfilesEnum;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => EstudianteEntity, (estudiante) => estudiante.tutor)
  estudiantes: EstudianteEntity[];
}
