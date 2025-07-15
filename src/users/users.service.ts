import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find({ relations: ['perfil'] });
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Usuario ${id} no existe`);
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Email ya registrado');
    const hash = await bcrypt.hash(
      dto.password,
      await bcrypt.genSalt(Number(process.env.SALT_ROUND) || 10),
    );
    const user = this.userRepo.create({
      ...dto,
      password: hash,
    });
    return this.userRepo.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(
        dto.password,
        await bcrypt.genSalt(Number(process.env.SALT_ROUND) || 10),
      );
    }
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }
}
