import { PerfilesEnum } from './perfiles.enum';

export class UsuarioIdentityDTO {
  id_usuario?: number;
  id_tutor?: number;
  nombreCompleto: string;
  correo: string;
  activo: boolean;
  perfil: PerfilesEnum;
}
