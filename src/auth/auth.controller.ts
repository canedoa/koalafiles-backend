import { Controller, Post, Body,Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtAuthGuard }                     from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

  
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Post('login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }
}
