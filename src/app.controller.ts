import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProfilesService } from './profiles/profiles.service';
import { CreateUserDto } from './auth/dto/create-user-dto';
import { UpdateProfileDto } from './profiles/dto/update-profile.dto';


@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // 1) GET /profiles
  @Get()
  findAllProfiles() {
    return this.profilesService.findAllProfiles();
  }

  // 2) GET /profiles/users
  @Get('users')
  findAllUsers() {
    return this.profilesService.findAllUsers();
  }

  // 3) PATCH /profiles/users/:id
  @Patch('users/:id')
  updateUserProfile(
    @Param('id', ParseIntPipe) userId: number,
    @Body('idPerfil', ParseIntPipe) idPerfil: number,
  ) {
    return this.profilesService.updateUserProfile(userId, idPerfil);
  }

  // 4) POST /profiles/users
  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.profilesService.createUser(dto);
  }

  
}
