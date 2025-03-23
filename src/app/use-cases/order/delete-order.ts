import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../repositories/order-repository';

interface DeleteOrderRequest {
  id: string;
}

interface DeleteOrderResponse {
  success: boolean;
}

@Injectable()
export class DeleteOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(request: DeleteOrderRequest): Promise<DeleteOrderResponse> {
    const { id } = request;

    const success = await this.orderRepository.delete(id);

    return {
      success,
    };
  }
}
