import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginDto } from './dto/login-dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { StorageService } from '../storage/storage.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly storageService: StorageService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('El correo ya está registrado');
    }

    // Hashear la contraseña
    const saltRounds = Number(process.env.SALT_ROUND) || 10;
    const hashedPassword = await bcrypt.hash(
      dto.password,
      await bcrypt.genSalt(saltRounds),
    );

    // Crear nuevo usuario
    const newUser = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    // Guardar en la base de datos
    await this.userRepository.save(newUser);

    // Aseguramos la carpeta fisica para este usuario
    this.storageService.ensureUserFolder(newUser.id.toString());

    return { message: 'Usuario registrado exitosamente' };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    this.storageService.ensureUserFolder(user.id.toString());
    // ——————————————————————————————————————————
    // Aquí firmamos un JWT real usando JwtService
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    // ——————————————————————————————————————————

    return {
      token,
      user: {
        id: user.id,
        name: user.firstName,
        email: user.email,
        idPerfil: user.perfil?.idPerfil,
      },
    };
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    return user;
  }
}
