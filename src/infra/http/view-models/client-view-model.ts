import { Client } from '../../../app/entities/client';

export class ClientViewModel {
  static toCreate(success: boolean) {
    return {
      isCreated: success,
    };
  }

  static toDelete(success: boolean) {
    return {
      isDelete: success,
    };
  }

  static toFindAll(clients: Client[]) {
    return clients.map((client) => ({
      id: client.id,
      name: client.name,
      contact: client.contact,
    }));
  }
}
