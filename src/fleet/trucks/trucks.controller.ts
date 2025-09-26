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
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateTruckDto } from '../dto/create-truck.dto';
import { Role } from '@prisma/client';
import { TrucksService } from './trucks.service';

@Controller('trucks')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateTruckDto) {
    return this.trucksService.create(dto);
  }

  @Get()
  findAll() {
    return this.trucksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trucksService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: Partial<CreateTruckDto>) {
    return this.trucksService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.trucksService.remove(+id);
  }
}
