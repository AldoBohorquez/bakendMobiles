import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginResponseDTO } from './dto/login-response.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDTO } from './dto/token-payload.dto';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';
import { TutoresService } from 'src/tutores/tutores.service';
import { TutoresEntity } from 'src/tutores/entities/tutore.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly tutoresService: TutoresService,
    private readonly jwtService: JwtService,
  ) {}
  async login(
    correo: string,
    contrasenia: string,
    ip: string,
  ): Promise<LoginResponseDTO> {
    const usuario = await this.usuariosService.findByEmail(correo);
    //ver si el usuario existe,
    if (!usuario) {
      throw new HttpException('Correo no válidas', HttpStatus.UNAUTHORIZED);
    }

    const bycrypt = require('bcrypt');

    //si la contraseña es correcta
    if (!bycrypt.compareSync(contrasenia, usuario.contrasenia)) {
      throw new HttpException('Contraseña no válidas', HttpStatus.UNAUTHORIZED);
    }

    //este activo
    if (!usuario.activo) {
      throw new HttpException('Usuario inactivo', HttpStatus.FORBIDDEN);
    }

    //generar token
    const payload: TokenPayloadDTO = {
      sub: usuario.id_usuario,
      ip,
      type: 'USUARIO',
    };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }

  async loginTutores(
    correo: string,
    contrasenia: string,
    ip: string,
  ): Promise<LoginResponseDTO> {
    const tutor = await this.tutoresService.findByEmail(correo);
    //ver si el usuario existe,
    if (!tutor) {
      throw new HttpException('Correo no válidas', HttpStatus.UNAUTHORIZED);
    }

    const bycrypt = require('bcrypt');

    //si la contraseña es correcta
    if (!bycrypt.compareSync(contrasenia, tutor.contrasena)) {
      throw new HttpException('Contraseña no válidas', HttpStatus.UNAUTHORIZED);
    }

    //generar token
    const payload: TokenPayloadDTO = { sub: tutor.id_tutor, ip, type: 'TUTOR' };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }

  async validateToken(token: string): Promise<UsuarioEntity> {
    try {
      const tokenPayload: TokenPayloadDTO = this.jwtService.verify(token);
      const usuario = await this.usuariosService.findById(tokenPayload.sub);
      if (!usuario) {
        throw new HttpException(
          'Usuario no encontrado',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return usuario;
    } catch (error) {
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateTokenTutor(token: string): Promise<TutoresEntity> {
    try {
      const tokenPayload: TokenPayloadDTO = this.jwtService.verify(token);
      const tutor = await this.tutoresService.findById(tokenPayload.sub);
      if (!tutor) {
        throw new HttpException('Tutor no encontrado', HttpStatus.UNAUTHORIZED);
      }
      return tutor;
    } catch (error) {
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }
  }
}
