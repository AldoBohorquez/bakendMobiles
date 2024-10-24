import { Injectable, Logger } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosRepository } from './usuarios.repository';
import { UsuarioEntity } from './entities/usuario.entity';
import { PerfilesEnum } from './dto/perfiles.enum';
import { UsuarioIdentityDTO } from './dto/usuario-identity.dto';
import { LoginUserDto } from './dto/loginuser.dto';
import { TutoresEntity } from 'src/tutores/entities/tutore.entity';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);

  constructor(
    @InjectRepository(UsuariosRepository)
    private readonly usuariosRepository: UsuariosRepository,
  ) {}
  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAll(): Promise<Array<UsuarioEntity>> {
    return this.usuariosRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  findByEmail(correo: string): Promise<UsuarioEntity> {
    return this.usuariosRepository.findByEmail(correo);
  }

  findById(id: number): Promise<UsuarioEntity> {
    return this.usuariosRepository.findById(id);
  }

  async crearPrimerUsuario() {
    const usuario =
      await this.usuariosRepository.findByEmail('super@dominio.com');
    if (!usuario) {
      this.logger.verbose('Creating the first user');
      const usuarioCreado = await this.usuariosRepository.save({
        nombreCompleto: 'Super Usuario',
        correo: 'super@dominio.com',
        perfil: PerfilesEnum.SUPER,
        contrasenia: await this.encryptPassword('123456'),
        activo: true,
      });
      this.logger.verbose('First user created: ' + usuarioCreado.correo);
    }
  }

  async encryptPassword(password: string): Promise<string> {
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async userIdentity(
    user: UsuarioEntity | TutoresEntity,
  ): Promise<UsuarioIdentityDTO> {
    if (user instanceof UsuarioEntity) {
      return {
        id_usuario: user.id_usuario,
        correo: user.correo,
        nombreCompleto: user.nombreCompleto,
        perfil: user.perfil,
        activo: true,
      };
    } else if (user instanceof TutoresEntity) {
      return {
        id_tutor: user.id_tutor,
        correo: user.correo,
        nombreCompleto: user.nombre,
        perfil: user.perfil,
        activo: true,
      };
    }
  }
}
