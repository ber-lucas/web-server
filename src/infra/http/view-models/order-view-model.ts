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
      date: order.date,
      clientId: order.clientId,
      totalValue: order.totalValue,
      garments: order.garments.map((garmentOnOrder) => ({
        garment: {
          type: garmentOnOrder.garment.type,
          value: garmentOnOrder.garment.value,
        },
        garmentId: garmentOnOrder.garmentId,
        amount: garmentOnOrder.amount,
      })),
    }));
  }
}
