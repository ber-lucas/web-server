import { randomUUID } from 'node:crypto';

export interface OrderProperties {
  date: Date;
  clientId: string;
  garmentId: string;
  amount: number;
}

export class Order {
  private properties: OrderProperties;
  private readonly _id: string;

  constructor(properties: OrderProperties) {
    this.properties = properties;

    if (this.properties.date == undefined) {
      this.properties.date = new Date();
    }

    this._id = randomUUID();
  }

  public get id(): string {
    return this._id;
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
