import { Client } from '../entities/client';

export abstract class ClientRepository {
  abstract create(client: Client): Promise<void>;
  abstract delete(id: string): Promise<boolean>;
  abstract findAll(): Promise<Client[]>;
}
