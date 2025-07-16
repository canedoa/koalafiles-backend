import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../entities/user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn({ name: 'idPerfil' })
  idPerfil: number;

  @Column({ name: 'perfil' })
  perfil: string;

  @OneToMany(() => User, (user) => user.perfil)
  usuarios: User[];
}
