import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DriversService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateDriverDto) {
    return this.prisma.driver.create({ data: dto });
  }

  findAll() {
    return this.prisma.driver.findMany({ include: { truck: true } });
  }

  findOne(id: number) {
    return this.prisma.driver.findUnique({
      where: { id },
      include: { truck: true },
    });
  }

  update(id: number, dto: Partial<CreateDriverDto>) {
    return this.prisma.driver.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.driver.delete({ where: { id } });
  }

  assignTruck(driverId: number, truckId: number) {
    return this.prisma.driver.update({
      where: { id: driverId },
      data: { truckId },
    });
  }
}
