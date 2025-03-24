import { GarmentRepository } from '../../../app/repositories/garment-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Garment } from '../../../app/entities/garment';

@Injectable()
export class PrismaGarmentRepository implements GarmentRepository {
  constructor(private prismaService: PrismaService) {}

  async create(garment: Garment): Promise<boolean> {
    try {
      await this.prismaService.garment.create({
        data: {
          id: garment.id,
          name: garment.name,
          type: garment.type,
          value: garment.value,
        },
      });

      return true;
    } catch (e) {
      throw new Error(`Create garment error: ${e}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prismaService.garment.delete({
        where: { id },
      });

      return true;
    } catch (e) {
      throw new Error(`Delete garment error: ${e}`);
    }
  }

  async findAll(): Promise<Garment[]> {
    try {
      const garments = await this.prismaService.garment.findMany();

      return garments.map((garment) => new Garment(garment));
    } catch (e) {
      throw new Error(`FindAll garment error: ${e}`);
    }
  }
}
