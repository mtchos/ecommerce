import { Controller, Get, Post, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(+id);
  }
}
