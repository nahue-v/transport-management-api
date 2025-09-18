import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString() name: string;
  @IsEmail() email: string;
  @MinLength(6) password: string;
}
