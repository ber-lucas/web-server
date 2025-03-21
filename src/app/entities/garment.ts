import { randomUUID } from 'node:crypto';

export interface GarmentProperties {
  type: string;
  value: number;
}

export class Garment {
  private properties: GarmentProperties;
  private readonly _id: string;

  constructor(properties: GarmentProperties) {
    this.properties = properties;
    this._id = randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public get type(): string {
    return this.properties.type;
  }

  public set type(type: string) {
    this.properties.type = type;
  }

  public get value(): number {
    return this.properties.value;
  }

  public set value(value: number) {
    this.properties.value = value;
  }
}
