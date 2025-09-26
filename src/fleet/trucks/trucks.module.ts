import { Module } from '@nestjs/common';
import { TrucksController } from './trucks.controller';
import { TrucksService } from './trucks.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TrucksController],
  providers: [TrucksService],
  imports: [PrismaModule],
})
export class TrucksModule {}
