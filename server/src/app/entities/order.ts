import { randomUUID } from 'node:crypto';

export interface GarmentOrder {
  garmentId: string;
  amount: number;
  value: number;
  type?: string;
}

export interface OrderProperties {
  orderNumber?: number;
  date?: Date;
  clientId: string;
  totalValue?: number;
  garments: GarmentOrder[];
}

export class Order {
  private properties: OrderProperties;
  private readonly _id: string;

  private totalValueCalc(garments: GarmentOrder[]): number {
    let total: number = 0;

    garments.forEach((garmentProps) => {
      total = total + garmentProps.value * garmentProps.amount;
    });

    return total;
  }

  constructor(properties: OrderProperties, id?: string) {
    console.log(properties.totalValue);
    this.properties = {
      ...properties,
      date: properties.date ?? new Date(),
      totalValue: this.totalValueCalc(properties.garments),
    };

    this._id = id ?? randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public get totalValue(): number {
    return this.properties.totalValue;
  }

  public get orderNumber(): number {
    return this.properties.orderNumber!;
  }

  public set orderNumber(orderNumber: number) {
    this.properties.orderNumber = orderNumber;
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
