import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientsController } from './controllers/client.controller';
import { CreateClient } from '../../app/use-cases/client/create-client';

@Module({
  imports: [PrismaModule],
  controllers: [ClientsController],
  providers: [CreateClient],
})
export class HttpModule {}
