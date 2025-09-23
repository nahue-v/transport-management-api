import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [TaskModule, AuthModule, ProductsModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
