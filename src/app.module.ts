import { TaskModule } from './routes/task/task.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProvider } from './database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    databaseProvider,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
