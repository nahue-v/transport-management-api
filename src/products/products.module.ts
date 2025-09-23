import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductService],
  imports: [PrismaModule],
})
export class ProductsModule {}
