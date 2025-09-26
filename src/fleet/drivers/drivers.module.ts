import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
  imports: [PrismaModule],
})
export class DriversModule {}
