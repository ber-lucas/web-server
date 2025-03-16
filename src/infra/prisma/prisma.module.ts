import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientRepository } from '../../app/repositories/client-repository';
import { PrismaClientRepository } from './repositories/prisma-client-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
})
export class PrismaModule {}
