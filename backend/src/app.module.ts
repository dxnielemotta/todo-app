import { Module } from '@nestjs/common';

import { PrismaModule } from './db/prisma.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [PrismaModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
