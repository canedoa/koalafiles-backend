// ...existing code...
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
// import { Permission } from '../permission/permission.entity';
import { User } from '../../../entities/user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  idPerfil: number;

  @Column({ name: 'perfil', unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.perfil)
  usuarios: User[];

  // Eliminada relación ManyToMany con Permission para evitar tabla innecesaria
}
