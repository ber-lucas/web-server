import { CreateGarment } from '../../../app/use-cases/garment/create-garment';
import { DeleteGarment } from '../../../app/use-cases/garment/delete-garment';
import { FindAllGarment } from '../../../app/use-cases/garment/findAll-garment';
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { GarmentViewModel } from '../view-models/garment-view-model';
import { CreateGarmentBody } from '../dtos/garmentDTO/create-garment-body';
import { DeleteGarmentBody } from '../dtos/garmentDTO/delete-garment-body';

@Controller('garment')
export class GarmentController {
  constructor(
    private createGarment: CreateGarment,
    private deleteGarment: DeleteGarment,
    private findAllGarment: FindAllGarment,
  ) {}

  @Post('create')
  async create(@Body() body: CreateGarmentBody): Promise<GarmentViewModel> {
    const { type, value } = body;

    try {
      const { garment } = await this.createGarment.execute({
        type,
        value,
      });

      return GarmentViewModel.toCreate(garment);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Delete('delete')
  async delete(@Body() body: DeleteGarmentBody): Promise<GarmentViewModel> {
    const { id } = body;

    try {
      const { success } = await this.deleteGarment.execute({ id });

      return GarmentViewModel.toDelete(success);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('findAll')
  async findAll(): Promise<GarmentViewModel> {
    try {
      const { garments } = await this.findAllGarment.execute();

      return GarmentViewModel.toFindAll(garments);
    } catch (e) {
      throw new Error(e);
    }
  }
}
