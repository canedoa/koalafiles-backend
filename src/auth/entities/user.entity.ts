import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users') // Nombre de la tabla en la base de datos
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
  password: string; // Será la contraseña encriptada

  @Column()
  phone: string;

  @Column({ default: 'free' })
  plan: string;

  @Column({ type: 'int', default: 100 })
  space_allocated: number;

  @Column({ type: 'int', default: 0 })
  space_used: number;

  @Column({ default: false })
  accepted_terms: boolean;

  @CreateDateColumn()
  created_at: Date;
}
