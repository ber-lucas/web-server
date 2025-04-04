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
import { OrderController } from './controllers/order.controller';
import { CreateOrder } from '../../app/use-cases/order/create-order';
import { DeleteOrder } from '../../app/use-cases/order/delete-order';
import { FindAllOrder } from '../../app/use-cases/order/findAll-order';

@Module({
  imports: [PrismaModule],
  controllers: [ClientController, GarmentController, OrderController],
  providers: [
    CreateClient,
    DeleteClient,
    FindAllClient,
    CreateGarment,
    DeleteGarment,
    FindAllGarment,
    CreateOrder,
    DeleteOrder,
    FindAllOrder,
  ],
})
export class HttpModule {}
