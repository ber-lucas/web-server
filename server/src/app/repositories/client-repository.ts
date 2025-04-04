import { Client } from '../entities/client';

export abstract class ClientRepository {
  abstract create(client: Client): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
  abstract findAll(): Promise<Client[]>;
}
