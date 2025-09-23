import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string;
  @IsNumber()
  @Min(0)
  price: number;
  @IsNumber()
  @Min(0)
  stock: number;
}
