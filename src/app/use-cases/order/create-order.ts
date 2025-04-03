import { OrderRepository } from '../../repositories/order-repository';
import { Order } from '../../entities/order';
import { Injectable } from '@nestjs/common';

interface GarmentOrderProperties {
  garmentId: string;
  amount: number;
  value: number;
}

interface CreateOrderRequest {
  date?: Date;
  clientId: string;
  garments: GarmentOrderProperties[];
}

interface CreateOrderResponse {
  success: boolean;
}

@Injectable()
export class CreateOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    const { date, clientId, garments } = request;

    const order = new Order({
      date,
      clientId,
      garments,
    });

    const success = await this.orderRepository.create(order);

    return {
      success,
    };
  }
}
