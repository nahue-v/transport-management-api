import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { TrucksModule } from './fleet/trucks/trucks.module';
import { DriversModule } from './fleet/drivers/drivers.module';

@Module({
  imports: [
    TaskModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    TrucksModule,
    DriversModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
