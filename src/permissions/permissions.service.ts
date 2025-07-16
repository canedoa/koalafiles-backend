import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findOne(idUsuario: number) {
    const perm = await this.permissionRepository.findOne({ where: { idUsuario } });
    if (!perm) {
      // Si no existe, retorna permisos en falso
      return { createFolder: false, uploadFile: false };
    }
    return {
      createFolder: !!perm.CrearCarpeta,
      uploadFile: !!perm.SubirArchivo,
    };
  }

  async update(idUsuario: number, updatePermissionDto: { createFolder: boolean; uploadFile: boolean }) {
    let perm = await this.permissionRepository.findOne({ where: { idUsuario } });
    if (!perm) {
      perm = this.permissionRepository.create({
        idUsuario,
        CrearCarpeta: updatePermissionDto.createFolder ? 1 : 0,
        SubirArchivo: updatePermissionDto.uploadFile ? 1 : 0,
      });
    } else {
      perm.CrearCarpeta = updatePermissionDto.createFolder ? 1 : 0;
      perm.SubirArchivo = updatePermissionDto.uploadFile ? 1 : 0;
    }
    await this.permissionRepository.save(perm);
    return { success: true };
  }

  // ...otros métodos existentes si los necesitas
}
