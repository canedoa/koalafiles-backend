import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn({ name: 'idpermisos' })
  id: number;

  @Column({ name: 'cnombre' })
  name: string;

  @Column({ name: 'cmetodo' })
  method: string;

  @Column({ name: 'cicono', nullable: true })
  icon: string;

  @Column({ name: 'iActivo', type: 'tinyint', default: 1 })
  isActive: boolean;

  @ManyToMany(() => Profile, (profile) => profile.permissions)
  profiles: Profile[];
}

