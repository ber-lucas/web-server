import { OrderRepository } from '../../repositories/order-repository';
import { Order } from '../../entities/order';
import { Injectable } from '@nestjs/common';

interface CreateOrderRequest {
  date: Date;
  clientId: string;
  garmentId: string;
  amount: number;
}

interface CreateOrderResponse {
  order: Order;
}

@Injectable()
export class CreateOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    const { date, clientId, garmentId, amount } = request;

    const order = new Order({
      date,
      clientId,
      garmentId,
      amount,
    });

    await this.orderRepository.create(order);

    return {
      order,
    };
  }
}
