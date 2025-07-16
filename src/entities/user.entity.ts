import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from '../auth/entities/profile/profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  plan: string;

  @Column({ default: true })
  accepted_terms: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: 2 })
  idPerfil: number;

  @ManyToOne(() => Profile, (profile) => profile.usuarios)
  @JoinColumn({ name: 'idPerfil' })
  perfil: Profile;
}
