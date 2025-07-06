import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('El correo ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(
      dto.password,
      await bcrypt.genSalt(Number(process.env.SALT_ROUND)),
    );

    // Crear nuevo usuario
    const newUser = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    // Guardar en la base de datos
    await this.userRepository.save(newUser);

    return { message: 'Usuario registrado exitosamente' };
  }

  async login(dto: CreateUserDto) {
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

    // Aquí podrías generar un JWT si quieres autenticación con token
    return {
      token: 'FAKE-TOKEN', // por ahora es un placeholder
      user: {
        id: user.id,
        name: user.firstName,
        email: user.email,
      },
    };
  }
}
