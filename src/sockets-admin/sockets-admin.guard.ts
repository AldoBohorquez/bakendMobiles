import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { SocketUser } from './socket-user.dto';

@Injectable()
export class SocketsAdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: SocketUser = context.switchToWs().getClient();
    const token = client.handshake.auth.token;
    if (!token) {
      throw new WsException('Token no proporcionado');
    }
    try {
      let invalidToken = false;
      const user = await this.authService.validateToken(token);
      if (!user) {
        invalidToken = true;
      }

      if (!user.activo) {
        invalidToken = true;
      }

      if (invalidToken) {
        const user = await this.authService.validateTokenTutor(token);
        if (!user) {
          throw new WsException('Token inválido');
        }
        client.data2 = {
          user,
        };

        return true;
      }

      //adjuntar el usuario a la data del cliente
      client.data1 = {
        user,
      };

      return true;
    } catch (error) {
      throw new WsException('Token inválido');
    }
  }
}
