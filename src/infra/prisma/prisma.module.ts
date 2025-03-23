import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientRepository } from '../../app/repositories/client-repository';
import { PrismaClientRepository } from './repositories/prisma-client-repository';
import { GarmentRepository } from '../../app/repositories/garment-repository';
import { PrismaGarmentRepository } from './repositories/prisma-garment-repository';
import { OrderRepository } from '../../app/repositories/order-repository';
import { PrismaOrderRepository } from './repositories/prisma-order-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
    {
      provide: GarmentRepository,
      useClass: PrismaGarmentRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [ClientRepository, GarmentRepository, OrderRepository],
})
export class PrismaModule {}
