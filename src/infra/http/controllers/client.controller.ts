import { Body, Controller } from '@nestjs/common';
import { CreateClient } from '../../../app/use-cases/client/create-client';
import { CreateClientBody } from '../dtos/create-client-body';
import { ClientViewModel } from '../view-models/client-view-model';

@Controller('client')
export class ClientsController {
  constructor(private createClient: CreateClient) {}

  async create(@Body() body: CreateClientBody): Promise<ClientViewModel> {
    const { name, contact } = body;

    try {
      const { client } = await this.createClient.execute({
        name,
        contact,
      });

      return ClientViewModel.toCreate(client);
    } catch (e) {
      throw new Error(e);
    }
  }
}
