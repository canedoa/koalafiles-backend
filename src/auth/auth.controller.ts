import { Controller, Post, Body,Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtAuthGuard }                     from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

  
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    // Busca el usuario en la base de datos y devuelve el nombre
    const user = await this.authService.findById(req.user.userId);
    return {
      userId: user.id,
      email: user.email,
      name: user.firstName, // o el campo que prefieras
    };
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
