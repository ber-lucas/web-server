import { Order } from '../../../app/entities/order';

export class OrderViewModel {
  static toCreate(success: boolean) {
    return {
      isCreated: success,
    };
  }

  static toDelete(success: boolean) {
    return {
      isDeleted: success,
    };
  }

  static toFindAll(orders: Order[]) {
    return orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      date: order.date,
      clientId: order.clientId,
      totalValue: order.totalValue,
      garments: order.garments.map((garmentOnOrder) => ({
        garmentId: garmentOnOrder.garmentId,
        amount: garmentOnOrder.amount,
        value: garmentOnOrder.value,
        type: garmentOnOrder.type,
      })),
    }));
  }
}
