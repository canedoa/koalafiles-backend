
import { IsEmail, IsNotEmpty, IsBoolean, IsString, MinLength, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  plan?: string;

  @IsNotEmpty()
  @IsBoolean()
  accepted_terms?: boolean;

  @IsOptional()
  @IsNumber()
  idPerfil?: number;
}
