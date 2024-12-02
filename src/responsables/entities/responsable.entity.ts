import { EstudianteEntity } from 'src/estudiantes/entities/estudiante.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('responsables')
export class ResponsableEntity {
  @PrimaryGeneratedColumn()
  id_responsable: number;

  @Column()
  nombre: string;

  @Column()
  parentesco: string;

  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.responsables)
  estudiante: EstudianteEntity;
}
