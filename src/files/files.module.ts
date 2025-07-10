
import { Module }          from '@nestjs/common';
import { FilesController } from './files.controller';
import { StorageService }  from '../storage/storage.service';

@Module({
  imports: [],                  
  controllers: [FilesController],
  providers:   [StorageService],// los servicios que usa FilesController
})
export class FilesModule {}
