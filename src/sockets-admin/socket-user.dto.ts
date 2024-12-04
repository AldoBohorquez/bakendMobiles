import { Socket } from 'socket.io';
import { TutorIdentityDTO } from 'src/usuarios/dto/tutor-identity.dto';
import { UsuarioIdentityDTO } from 'src/usuarios/dto/usuario-identity.dto';
export class SocketUser extends Socket {
  data1: {
    user: UsuarioIdentityDTO;
  };
  data2: {
    user: TutorIdentityDTO;
  };
}
