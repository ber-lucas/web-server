import { Client } from '../../entities/client';
import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../repositories/client-repository';

interface CreateClientResponse {
  client: Client;
}

interface CreateClientRequest {
  name: string;
  contact: string;
}

@Injectable()
export class CreateClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(request: CreateClientRequest): Promise<CreateClientResponse> {
    const { name, contact } = request;

    const client = new Client({
      name,
      contact,
    });

    await this.clientRepository.create(client);

    return {
      client,
    };
  }
}
