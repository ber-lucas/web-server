import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientsController } from './controllers/client.controller';
import { CreateClient } from '../../app/use-cases/client/create-client';
import { DeleteClient } from '../../app/use-cases/client/delete-client';
import { FindAllClient } from '../../app/use-cases/client/findAll-client';

@Module({
  imports: [PrismaModule],
  controllers: [ClientsController],
  providers: [CreateClient, DeleteClient, FindAllClient],
})
export class HttpModule {}
