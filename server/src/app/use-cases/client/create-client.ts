import { Client } from '../../entities/client';
import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../repositories/client-repository';

interface CreateClientResponse {
  success: boolean;
}

interface CreateClientRequest {
  name: string;
  contact: string;
  address: string;
}

@Injectable()
export class CreateClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(request: CreateClientRequest): Promise<CreateClientResponse> {
    const { name, contact, address } = request;

    const client = new Client({
      name,
      contact,
      address,
    });

    const success = await this.clientRepository.create(client);

    return {
      success,
    };
  }
}
