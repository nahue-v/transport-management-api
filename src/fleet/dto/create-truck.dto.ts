import { TruckStatus } from '@prisma/client';
import { IsEnum, IsInt, IsString, Min } from 'class-validator';

export class CreateTruckDto {
  @IsString()
  plate: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsEnum(TruckStatus)
  status?: TruckStatus = TruckStatus.AVAILABLE;
}
