import { randomUUID } from 'node:crypto';

export interface ClientProperties {
  name: string;
  contact: string;
  address: string;
}

export class Client {
  private properties: ClientProperties;
  private readonly _id: string;

  constructor(properties: ClientProperties, id?: string) {
    this.properties = properties;
    this._id = id ?? randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.properties.name;
  }

  public set name(name: string) {
    this.properties.name = name;
  }

  public get contact(): string {
    return this.properties.contact;
  }

  public set contact(contact: string) {
    this.properties.contact = contact;
  }

  public get address(): string {
    return this.properties.address;
  }

  public set address(address: string) {
    this.properties.address = address;
  }
}
