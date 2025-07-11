import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard }         from '../auth/jwt-auth.guard';
import { StorageService }       from '../storage/storage.service';
import { FileInterceptor }      from '@nestjs/platform-express';

@Controller('files')
@UseGuards(JwtAuthGuard)
  // proteger todas las rutas de este controlador
export class FilesController {
  constructor(private readonly storage: StorageService) {}

  //Listar contenido de storage/<userId> o subcarpetas
  @Get()
  list(@Req() req, @Query('path') path?: string) {
    const userId = req.user.userId.toString();
    // Si hay path, lo pasamos al storage service
    return this.storage.listUserFolder(userId, path);
  }

  //Subir un archivo a storage/<userId>/
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const userId = req.user.userId.toString();
    return this.storage.saveFile(userId, file);
  }

  //Crear subcarpeta dentro de storage/<userId>/
  @Post('mkdir')
  mkdir(@Req() req, @Body('name') name: string) {
    const userId = req.user.userId.toString();
    return this.storage.createSubfolder(userId, name);
  }
}
