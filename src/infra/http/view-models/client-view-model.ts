import { Client } from '../../../app/entities/client';

export class ClientViewModel {
  static toCreate(client: Client) {
    return {
      name: client.name,
      contact: client.contact,
    };
  }

  static toDelete(success: boolean) {
    return {
      isDelete: success,
    };
  }

  static toFindAll(clients: Client[]) {
    return {
      clients: clients.map((client) => ({
        id: client.id,
        name: client.name,
        contact: client.contact,
      })),
    };
  }
}
