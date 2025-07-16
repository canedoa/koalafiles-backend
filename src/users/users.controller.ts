// ...existing code...
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PermissionsService } from '../permissions/permissions.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id/permissions')
  async getUserPermissions(@Param('id') id: number) {
    return await this.permissionsService.findOne(Number(id));
  }

  @Patch(':id/permissions')
  async updateUserPermissions(
    @Param('id') id: number,
    @Body() updatePermissionDto: { createFolder: boolean; uploadFile: boolean },
  ) {
    return await this.permissionsService.update(
      Number(id),
      updatePermissionDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(Number(id), dto);
  }

  @Patch(':id')
  patch(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(Number(id));
  }
}
