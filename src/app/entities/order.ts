import { randomUUID } from 'node:crypto';

export interface GarmentOrderProperties {
  id: string;
  type: string;
  value: number;
}

export interface GarmentOrder {
  garment: GarmentOrderProperties;
  amount: number;
}

export interface OrderProperties {
  date?: Date;
  clientId: string;
  garments: GarmentOrder[];
}

export class Order {
  private properties: OrderProperties;
  private readonly _id: string;

  constructor(properties: OrderProperties) {
    this.properties = {
      ...properties,
      date: properties.date ?? new Date(),
    };

    this._id = randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public get date(): Date {
    return this.properties.date!;
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

  public get garments(): GarmentOrder[] {
    return this.properties.garments;
  }

  public set garments(garments: GarmentOrder[]) {
    this.properties.garments = garments;
  }
}
