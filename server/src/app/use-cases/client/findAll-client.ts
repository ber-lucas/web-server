import { Client } from '../../entities/client';
import { ClientRepository } from '../../repositories/client-repository';
import { Injectable } from '@nestjs/common';

interface FindAllClientResponse {
  clients: Client[];
}

@Injectable()
export class FindAllClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(): Promise<FindAllClientResponse> {
    const clients = await this.clientRepository.findAll();

    return {
      clients,
    };
  }
}
