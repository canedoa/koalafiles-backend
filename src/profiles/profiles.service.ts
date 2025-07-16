import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../auth/entities/profile/profile.entity';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../auth/dto/create-user-dto';

@Injectable()
export class ProfilesService {
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
    return this.userRepo.find({ relations: ['perfil'] });
  }

  // 3) cambiar perfil de usuario
  async updateUserProfile(userId: number, idPerfil: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('Usuario no encontrado');
    const perfil = await this.profileRepo.findOneBy({ idPerfil });
    if (!perfil) throw new BadRequestException('Perfil no encontrado');
    user.idPerfil = idPerfil;
    user.perfil = perfil;
    return this.userRepo.save(user);
  }

  // 4) crear usuario
  async createUser(dto: CreateUserDto) {
    // Si no viene idPerfil, por defecto cliente
    if (!dto.idPerfil) dto.idPerfil = 2;
    const perfil = await this.profileRepo.findOneBy({ idPerfil: dto.idPerfil });
    if (!perfil) throw new BadRequestException('Perfil no encontrado');
    const user = this.userRepo.create({ ...dto, perfil });
    return this.userRepo.save(user);
  }

  async create(createProfileDto: any) {
    return this.profileRepo.save(createProfileDto);
  }

  async findAll() {
    return this.profileRepo.find();
  }

  async findOne(idPerfil: number) {
    return this.profileRepo.findOne({ where: { idPerfil } });
  }

  async update(idPerfil: number, updateProfileDto: any) {
    await this.profileRepo.update(idPerfil, updateProfileDto);
    return this.findOne(idPerfil);
  }

  async remove(id: number) {
    await this.profileRepo.delete(id);
    return { deleted: true };
  }
}
