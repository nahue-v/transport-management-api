import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTruckDto } from '../dto/create-truck.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrucksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTruckDto) {
    return this.prisma.truck.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.truck.findMany({ include: { driver: true } });
  }

  findOne(id: number) {
    return this.prisma.truck.findUnique({
      where: { id },
      include: { driver: true },
    });
  }

  update(id: number, dto: Partial<CreateTruckDto>) {
    return this.prisma.truck.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.truck.delete({ where: { id } });
  }
}
