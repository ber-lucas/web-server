import { Client } from '../../entities/client';
import { ClientRepository } from '../../repositories/client-repository';

interface FindAllClientResponse {
  clients: Client[];
}

export class FindAllClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(): Promise<FindAllClientResponse> {
    const clients = await this.clientRepository.findAll();

    return {
      clients,
    };
  }
}
