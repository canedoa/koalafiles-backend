

import { Injectable, Logger } from '@nestjs/common';
import * as fs   from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly logger   = new Logger(StorageService.name);
  private readonly basePath = path.join(process.cwd(), 'storage');

  /** Crea la carpeta base y la especifica del usuario si no existen */
  ensureUserFolder(userId: string): void {
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath, { recursive: true });
      this.logger.log(`Carpeta base creada en ${this.basePath}`);
    }
    const userFolder = path.join(this.basePath, userId);
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
      this.logger.log(`Carpeta creada para usuario ${userId}`);
    }
  }

  /** Lista archivos y subcarpetas en storage/<userId> */
  listUserFolder(userId: string): string[] {
    const folder = path.join(this.basePath, userId);
    if (!fs.existsSync(folder)) {
      this.logger.warn(`Folder no existe para usuario ${userId}`);
      return [];
    }
    return fs.readdirSync(folder);
  }

  /** Guarda un archivo en storage/<userId>/<originalname> */
  saveFile(userId: string, file: Express.Multer.File) {
    const folder = path.join(this.basePath, userId);
    const dest   = path.join(folder, file.originalname);
    fs.writeFileSync(dest, file.buffer);
    this.logger.log(`Archivo subido para usuario ${userId}: ${file.originalname}`);
    return { filename: file.originalname };
  }

  /** Crea una subcarpeta dentro de storage/<userId>/<name> */
  createSubfolder(userId: string, name: string) {
    const parent = path.join(this.basePath, userId);
    const dir    = path.join(parent, name);
    if (!fs.existsSync(parent)) {
      this.ensureUserFolder(userId);
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      this.logger.log(`Subcarpeta creada para usuario ${userId}: ${name}`);
    }
    return { success: true };
  }
}

