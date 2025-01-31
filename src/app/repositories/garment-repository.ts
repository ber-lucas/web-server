import { Garment } from '../entities/garment';

export abstract class GarmentRepository {
  abstract create(garment: Garment): Promise<void>;
  abstract delete(id: string): Promise<boolean>;
  abstract findAll(): Promise<Garment[]>;
}
