import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDTO } from 'src/auth/dto/token-payload.dto';
import { ConfigKeys } from 'src/config-keys.enum';
import { IS_PUBLIC_KEY } from './public.decorator';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { IS_PROFILE_KEY } from './profile.decorator';
import { PerfilesEnum } from 'src/usuarios/dto/perfiles.enum';
import { Request } from 'express';
import { UsuarioIdentityDTO } from 'src/usuarios/dto/usuario-identity.dto';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';
import { TutoresEntity } from 'src/tutores/entities/tutore.entity';
import { TutoresService } from 'src/tutores/tutores.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usuariosService: UsuariosService,
    private readonly tutoresService: TutoresService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: Request & { user: UsuarioIdentityDTO } = context
      .switchToHttp()
      .getRequest();
    const tokenValue = this.extractTokenFromHeader(request);
    if (!tokenValue) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }
    let payload: TokenPayloadDTO;
    try {
      payload = await this.jwtService.verifyAsync(tokenValue, {
        secret: this.configService.get<string>(ConfigKeys.JWT_SECRET),
      });
    } catch (error) {
      throw new UnauthorizedException(
        new HttpException('Invalid token', HttpStatus.UNAUTHORIZED),
      );
    }

    let user: UsuarioEntity | TutoresEntity | null = null;
    if (payload.type == 'USUARIO') {
      user = await this.usuariosService.findById(payload.sub);
    } else if (payload.type == 'TUTOR') {
      user = await this.tutoresService.findById(payload.sub);
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if (!user.activo) {
      throw new HttpException('User is inactive', HttpStatus.UNAUTHORIZED);
    }

    //verificar si esta decorado para algun perfil
    const paraPerfiles = this.reflector.getAllAndOverride<Array<PerfilesEnum>>(
      IS_PROFILE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (paraPerfiles && !paraPerfiles.includes(user.perfil)) {
      throw new HttpException(
        'User does not have the required profile: ' + paraPerfiles.join(', '),
        HttpStatus.FORBIDDEN,
      );
    }

    request.user = await this.usuariosService.userIdentity(user);
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
