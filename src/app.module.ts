import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ProfilesController } from './app.controller';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    FilesModule,
    ProfilesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, //cargar variables de entorno desde el archivo .env
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // para no tener que declarar las entidades aquí
      synchronize: true, // usar solo en desarrollo
      extra: {
        connectionLimit: 2,
      },
    }),
  ],
  controllers: [ProfilesController],
  providers: [AppService],
})
export class AppModule {}
