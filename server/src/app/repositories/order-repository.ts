import { Order } from '../entities/order';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
  abstract findAll(): Promise<Order[]>;
}
