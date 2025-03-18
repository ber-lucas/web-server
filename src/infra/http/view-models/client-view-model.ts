import { Client } from '../../../app/entities/client';

export class ClientViewModel {
  static toCreate(client: Client) {
    return {
      name: client.name,
      contact: client.contact,
    };
  }
}
