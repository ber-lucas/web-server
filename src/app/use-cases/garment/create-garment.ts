import { Garment } from '../../entities/garment';
import { GarmentRepository } from '../../repositories/garment-repository';
import { Injectable } from '@nestjs/common';

interface CreateGarmentRequest {
  type: string;
  value: number;
}

interface CreateGarmentResponse {
  garment: Garment;
}

@Injectable()
export class CreateGarment {
  constructor(private garmentRepository: GarmentRepository) {}

  async execute(request: CreateGarmentRequest): Promise<CreateGarmentResponse> {
    const { type, value } = request;

    const garment = new Garment({
      type,
      value,
    });

    await this.garmentRepository.create(garment);

    return {
      garment,
    };
  }
}
