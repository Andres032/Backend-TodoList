import { databaseService } from './database.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [databaseService],
    exports: [databaseService]
})
export class DatabaseModule {}