import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(Role.CLIENT)
  create(@Body() dto: CreateOrderDto, @Req() req: any) {
    return this.ordersService.create(dto, req.user);
  }

  @Get()

  /**
   * Retrieve all orders
   * @returns All orders
   */
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  /**
   * Find an order by its id
   * @param id The id of the order to find
   * @returns The found order
   */
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.OPERATOR)
  /**
   * Update the state of an order
   * @param id The id of the order to update
   * @param dto The UpdateOrderStatusDto containing the new state
   * @param req The request object containing the user making the request
   * @returns The updated order
   */
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
    @Req() req: any,
  ) {
    return this.ordersService.updateState(id, dto, req.user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  /**
   * Delete an order by its id
   * @param id The id of the order to delete
   * @param req The request object containing the user making the request
   * @returns The deleted order
   */
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.ordersService.remove(id, req.user);
  }
}
