import { randomUUID } from 'node:crypto';

export interface OrderProperties {
  orderNumber: number;
  date: Date;
  clientId: string;
}

export class Order {
  private properties: OrderProperties;
  private readonly _id: string;

  constructor(properties: OrderProperties) {
    this.properties = properties;
    this._id = randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public get orderNumber(): number {
    return this.properties.orderNumber;
  }

  public get date(): Date {
    return this.properties.date;
  }

  public set date(date: Date) {
    this.properties.date = date;
  }

  public get clientId(): string {
    return this.properties.clientId;
  }

  public set clientId(clientId: string) {
    this.properties.clientId = clientId;
  }
}
