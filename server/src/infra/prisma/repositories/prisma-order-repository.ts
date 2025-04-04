import { OrderRepository } from '../../../app/repositories/order-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order } from '../../../app/entities/order';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prismaService: PrismaService) {}

  async create(order: Order): Promise<boolean> {
    try {
      await this.prismaService.order.create({
        data: {
          id: order.id,
          date: order.date,
          totalValue: order.totalValue,

          client: {
            connect: { id: order.clientId }, // 🔹 Vincula ao cliente existente
          },

          GarmentOnOrders: {
            createMany: {
              data: order.garments.map((garmentOrder) => ({
                garmentId: garmentOrder.garmentId,
                amount: garmentOrder.amount,
              })),
            },
          },
        },
      });

      return true;
    } catch (e) {
      throw new Error(`create Order error: ${e}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prismaService.garmentOnOrders.deleteMany({
        where: { orderId: id },
      });

      await this.prismaService.order.delete({
        where: { id },
      });

      return true;
    } catch (e) {
      throw new Error(`delete Order error: ${e}`);
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.prismaService.order.findMany({
        include: {
          GarmentOnOrders: {
            include: {
              garment: true,
            },
          },
        },
      });

      return orders.map(
        (order) =>
          new Order(
            {
              orderNumber: order.orderNumber,
              date: order.date,
              clientId: order.clientId,
              totalValue: order.totalValue,
              garments: order.GarmentOnOrders.map((garmentOnOrder) => ({
                garmentId: garmentOnOrder.garmentId,
                amount: garmentOnOrder.amount,
                value: garmentOnOrder.garment.value,
                type: garmentOnOrder.garment.type,
              })),
            },
            order.id,
          ),
      );
    } catch (e) {
      throw new Error(`find all Order error: ${e}`);
    }
  }
}
