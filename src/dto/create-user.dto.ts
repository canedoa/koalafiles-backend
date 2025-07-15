import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()      @IsNotEmpty() firstName: string;
  @IsString()      @IsNotEmpty() lastName: string;
  @IsEmail()       @IsNotEmpty() email: string;
  @IsString()      @IsNotEmpty() password: string;
  @IsString()      @IsNotEmpty() phone: string;
  @IsString()      @IsNotEmpty() plan: string;
  @IsInt()         @IsNotEmpty() idPerfil: number;
}

