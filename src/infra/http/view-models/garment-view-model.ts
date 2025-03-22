import { Garment } from '../../../app/entities/garment';

export class GarmentViewModel {
  static toCreate(garment: Garment) {
    return {
      type: garment.type,
      value: garment.value,
    };
  }

  static toDelete(success: boolean) {
    return {
      isDeleted: success,
    };
  }

  static toFindAll(garments: Garment[]) {
    return garments.map((garment) => ({
      type: garment.type,
      value: garment.value,
    }));
  }
}
