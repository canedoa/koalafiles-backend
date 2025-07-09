import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly basePath = path.join(process.cwd(), 'storage');

  ensureUserFolder(userId: string): void {
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath, { recursive: true });
    }
    const userFolder = path.join(this.basePath, userId);
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
      this.logger.log(`Carpeta creada para usuario ${userId}`);
    }
  }
}
