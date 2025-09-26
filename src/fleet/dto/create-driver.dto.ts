import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  truckId?: number;
}
