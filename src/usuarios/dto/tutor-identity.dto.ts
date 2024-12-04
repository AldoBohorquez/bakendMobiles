import { PerfilesEnum } from './perfiles.enum';

export class TutorIdentityDTO {
  id_tutor?: number;
  nombreCompleto: string;
  correo: string;
  activo: boolean;
  perfil: PerfilesEnum;
}
