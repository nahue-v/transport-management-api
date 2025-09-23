import { State } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsEnum(State)
  state: State;
}
