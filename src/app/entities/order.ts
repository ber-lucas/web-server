import { randomUUID } from 'node:crypto';

export interface GarmentOrderProperties {
  type: string;
  value: number;
}

export interface GarmentOrder {
  garment: GarmentOrderProperties;
  garmentId: string;
  amount: number;
}

export interface OrderProperties {
  date?: Date;
  clientId: string;
  totalValue?: number;
  garments: GarmentOrder[];
}

export class Order {
  private properties: OrderProperties;
  private readonly _id: string;

  private totalValueCalc(garments: GarmentOrder[]): number {
    let total: number;

    garments.forEach((garmentProps) => {
      total = total + garmentProps.garment.value * garmentProps.amount;
    });

    return total;
  }

  constructor(properties: OrderProperties) {
    this.properties = {
      ...properties,
      date: properties.date ?? new Date(),
      totalValue:
        properties.totalValue ?? this.totalValueCalc(properties.garments),
    };

    this._id = randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public get totalValue(): number {
    return this.properties.totalValue;
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
