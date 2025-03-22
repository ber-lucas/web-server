import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientController } from './controllers/client.controller';
import { CreateClient } from '../../app/use-cases/client/create-client';
import { DeleteClient } from '../../app/use-cases/client/delete-client';
import { FindAllClient } from '../../app/use-cases/client/findAll-client';
import { GarmentController } from './controllers/garment.controller';
import { CreateGarment } from '../../app/use-cases/garment/create-garment';
import { DeleteGarment } from '../../app/use-cases/garment/delete-garment';
import { FindAllGarment } from '../../app/use-cases/garment/findAll-garment';

@Module({
  imports: [PrismaModule],
  controllers: [ClientController, GarmentController],
  providers: [
    CreateClient,
    DeleteClient,
    FindAllClient,
    CreateGarment,
    DeleteGarment,
    FindAllGarment,
  ],
})
export class HttpModule {}
