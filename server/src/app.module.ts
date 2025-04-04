import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/prisma/prisma.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [HttpModule, PrismaModule],
})
export class AppModule {}
