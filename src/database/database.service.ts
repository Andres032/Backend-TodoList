import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities/index';

const entitiesList = Object.values(entities);

export const databaseService = TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot({})],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        return {
            type: 'postgres',
            host: configService.get('PGHOST'),
            port: configService.get<number>('PGPORT'),
            username: configService.get('PGUSER'),
            password: configService.get('PGPASSWORD'),
            database: configService.get('PGDATABASE'),
            //logging: false,
            entities: entitiesList,
            synchronize: false,
            retryDelay: 3000,
            retryAttempts: 10,
        };
    },
});