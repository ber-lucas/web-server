import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../../app/repositories/client-repository';
import { Client } from '../../../app/entities/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private prismaService: PrismaService) {}

  async create(client: Client): Promise<boolean> {
    try {
      await this.prismaService.client.create({
        data: {
          id: client.id,
          name: client.name,
          contact: client.contact,
          address: client.address,
        },
      });

      return true;
    } catch (e) {
      throw new Error(`Create client error: ${e}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prismaService.client.delete({
        where: { id },
      });

      return true;
    } catch (e) {
      throw new Error(`Delete client error: ${e}`);
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      const clients = await this.prismaService.client.findMany();

      return clients.map(
        (client) =>
          new Client(
            {
              name: client.name,
              contact: client.contact,
              address: client.address,
            },
            client.id,
          ),
      );
    } catch (e) {
      throw new Error(`Find all clients error: ${e}`);
    }
  }
}
