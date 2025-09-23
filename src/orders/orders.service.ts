import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from '@prisma/client';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto, user: any) {
    if (user.role !== Role.CLIENT) {
      throw new ForbiddenException('Only clients can create orders');
    }

    return this.prisma.$transaction(async (tx) => {
      let total = 0;
      const itemsData = [];

      for (const item of dto.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });
        if (!product)
          throw new NotFoundException(
            `Product with id ${item.productId} not found`,
          );
        if (product.stock < item.quantity) {
          throw new BadRequestException(
            `Product with id ${item.productId} does not have enough stock`,
          );
        }

        total += product.price * item.quantity;
        itemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });

        await tx.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity },
        });
      }

      return tx.order.create({
        data: {
          clientId: user.userId,
          total,
          orderItems: {
            create: itemsData,
          },
        },
        include: { orderItems: { include: { product: true } } },
      });
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        client: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        client: true,
      },
    });
  }

  updateState(id: number, dto: UpdateOrderStatusDto, user: any) {
    if (![Role.ADMIN, Role.OPERATOR].includes(user.role)) {
      throw new ForbiddenException(
        'Only admin and operator can update order state',
      );
    }
    return this.prisma.order.update({
      where: { id },
      data: { state: dto.state },
    });
  }

  remove(id: number, user: any) {
    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('Only admin can delete orders');
    }

    return this.prisma.order.delete({
      where: { id },
    });
  }
}
