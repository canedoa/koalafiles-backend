import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StorageService } from '../storage/storage.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // Configuramos Passport para JWT
    PassportModule.register({ defaultStrategy: 'jwt' }),

    //configura jwrModule con el secreto y la expiracion
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'CHANGE_ME',
      signOptions: { expiresIn: '1h' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, StorageService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
