import { Injectable } from '@nestjs/common';
import { GarmentRepository } from '../../repositories/garment-repository';

interface DeleteGarmentRequest {
  id: string;
}

interface DeleteGarmentResponse {
  success: boolean;
}

@Injectable()
export class DeleteOrder {
  constructor(private garmentRepository: GarmentRepository) {}

  async execute(request: DeleteGarmentRequest): Promise<DeleteGarmentResponse> {
    const { id } = request;

    const success = await this.garmentRepository.delete(id);

    return {
      success,
    };
  }
}
