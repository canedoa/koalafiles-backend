import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { User } from '../user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn({ name: 'idPerfil' })
  id: number;

  @Column({ name: 'perfil', unique: true })
  name: string;

  @ManyToMany(() => Permission, (perm) => perm.profiles, { cascade: true })
  @JoinTable({
    name: 'profiles_permissions',
    joinColumn:   { name: 'profile_id',   referencedColumnName: 'idPerfil' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

}
