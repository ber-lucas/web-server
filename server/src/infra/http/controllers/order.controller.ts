import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateOrder } from '../../../app/use-cases/order/create-order';
import { DeleteOrder } from '../../../app/use-cases/order/delete-order';
import { FindAllOrder } from '../../../app/use-cases/order/findAll-order';
import { CreateOrderBody } from '../dtos/orderDTO/create-order-body';
import { OrderViewModel } from '../view-models/order-view-model';
import { DeleteOrderBody } from '../dtos/orderDTO/delete-order-body';

@Controller('order')
export class OrderController {
  constructor(
    private createOrder: CreateOrder,
    private deleteOrder: DeleteOrder,
    private findAllOrder: FindAllOrder,
  ) {}

  @Post('create')
  async create(@Body() body: CreateOrderBody): Promise<OrderViewModel> {
    const { date, clientId, garments } = body;

    try {
      const { success } = await this.createOrder.execute({
        date,
        clientId,
        garments,
      });

      return OrderViewModel.toCreate(success);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Delete('delete')
  async delete(@Body() body: DeleteOrderBody): Promise<OrderViewModel> {
    const { id } = body;

    try {
      const { success } = await this.deleteOrder.execute({ id });

      return OrderViewModel.toDelete(success);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('findAll')
  async findAll(): Promise<OrderViewModel> {
    try {
      const { orders } = await this.findAllOrder.execute();

      return OrderViewModel.toFindAll(orders);
    } catch (e) {
      throw new Error(e);
    }
  }
}
