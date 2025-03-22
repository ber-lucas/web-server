import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateClient } from '../../../app/use-cases/client/create-client';
import { CreateClientBody } from '../dtos/clientDTO/create-client-body';
import { ClientViewModel } from '../view-models/client-view-model';
import { DeleteClientBody } from '../dtos/clientDTO/delete-client-body';
import { DeleteClient } from '../../../app/use-cases/client/delete-client';
import { FindAllClient } from '../../../app/use-cases/client/findAll-client';

@Controller('client')
export class ClientController {
  constructor(
    private createClient: CreateClient,
    private deleteClient: DeleteClient,
    private findAllClient: FindAllClient,
  ) {}

  @Post('create')
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

  @Delete('delete')
  async delete(@Body() body: DeleteClientBody): Promise<ClientViewModel> {
    const { id } = body;

    try {
      await this.deleteClient.execute({ id });

      return ClientViewModel.toDelete(true);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('findAll')
  async findAll(): Promise<ClientViewModel> {
    try {
      const { clients } = await this.findAllClient.execute();

      return ClientViewModel.toFindAll(clients);
    } catch (e) {
      throw new Error(e);
    }
  }
}
