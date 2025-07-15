import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../auth/dto/create-user-dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  // Métodos estándar para el controlador de perfiles
  async create(createProfileDto: any) {
    // Implementa la lógica real si lo necesitas
    return this.profileRepo.save(createProfileDto);
  }

  async findAll() {
    return this.profileRepo.find();
  }

  async findOne(id: number) {
    return this.profileRepo.findOne({ where: { id } });
  }

  async update(id: number, updateProfileDto: any) {
    await this.profileRepo.update(id, updateProfileDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.profileRepo.delete(id);
    return { deleted: true };
  }
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // 1) perfiles
  async findAllProfiles(): Promise<Profile[]> {
    return this.profileRepo.find();
  }

  // 2) usuarios
  async findAllUsers(): Promise<User[]> {
    return this.userRepo.find({ relations: ['profile'] });
  }

  // 3) cambiar perfil de usuario
  async updateUserProfile(userId: number, perfilId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('Usuario no encontrado');
    const perfil = await this.profileRepo.findOneBy({ id: perfilId });
    if (!perfil) throw new BadRequestException('Perfil no encontrado');
    user.perfil = perfil;
    return this.userRepo.save(user);
  }

  // 4) crear usuario
  async createUser(dto: CreateUserDto) {
    // aquí podrías repetir la lógica de AuthService o extraerla a un UsersService
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }
}
