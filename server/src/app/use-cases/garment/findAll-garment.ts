import { GarmentRepository } from '../../repositories/garment-repository';
import { Garment } from '../../entities/garment';
import { Injectable } from '@nestjs/common';

interface FindAllGarmentResponse {
  garments: Garment[];
}

@Injectable()
export class FindAllGarment {
  constructor(private garmentRepository: GarmentRepository) {}

  async execute(): Promise<FindAllGarmentResponse> {
    const garments = await this.garmentRepository.findAll();

    return {
      garments,
    };
  }
}
