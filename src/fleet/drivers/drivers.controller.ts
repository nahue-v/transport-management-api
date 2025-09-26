import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('drivers')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateDriverDto) {
    return this.driversService.create(dto);
  }

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: Partial<CreateDriverDto>) {
    return this.driversService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.driversService.remove(+id);
  }

  @Patch(':id/assign/:truckId')
  @Roles(Role.ADMIN)
  assignTruck(@Param('id') id: string, @Param('truckId') truckId: string) {
    return this.driversService.assignTruck(+id, +truckId);
  }
}
