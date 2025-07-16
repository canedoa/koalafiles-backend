import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn({ name: 'idpermisos' })
  idpermisos: number;

  @Column({ name: 'idUsuario' })
  idUsuario: number;

  @Column({ name: 'CrearCarpeta', type: 'tinyint', width: 1 })
  CrearCarpeta: number;

  @Column({ name: 'SubirArchivo', type: 'tinyint', width: 1 })
  SubirArchivo: number;
}

