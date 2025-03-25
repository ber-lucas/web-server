import { Garment } from '../../../app/entities/garment';

export class GarmentViewModel {
  static toCreate(success: boolean) {
    return {
      isCreated: success,
    };
  }

  static toDelete(success: boolean) {
    return {
      isDeleted: success,
    };
  }

  static toFindAll(garments: Garment[]) {
    return garments.map((garment) => ({
      id: garment.id,
      name: garment.name,
      type: garment.type,
      value: garment.value,
    }));
  }
}
