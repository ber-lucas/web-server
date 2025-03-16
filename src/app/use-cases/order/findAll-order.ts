import { OrderRepository } from '../../repositories/order-repository';
import { Order } from '../../entities/order';
import { Injectable } from '@nestjs/common';

interface FindAllOrderResponse {
  orders: Order[];
}

@Injectable()
export class FindAllOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<FindAllOrderResponse> {
    const orders = await this.orderRepository.findAll();

    return {
      orders,
    };
  }
}
