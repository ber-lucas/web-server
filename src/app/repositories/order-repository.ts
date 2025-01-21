import { Order } from '../entities/order';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Order[]>;
}
