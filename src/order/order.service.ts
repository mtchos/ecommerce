import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import axios from 'axios';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    const savedOrder = await this.orderRepository.save(order);

    try {
      const response = await axios.post(
        'https://api.pre.credix.finance/v1/orders',
        createOrderDto,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-CREDIPAY-API-KEY': `${process.env.CREDIPAY_API_KEY}`,
          },
        },
      );

      savedOrder.crediPayOrderId = response.data.orderId;
      savedOrder.status = 'accepted';
      savedOrder.externalId = response.data.externalId;
      await this.orderRepository.save(savedOrder);
    } catch (error) {
      savedOrder.status = 'declined';
      await this.orderRepository.save(savedOrder);
      throw new Error(error.message);
    }

    return savedOrder;
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
