import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from '../database/entities/index';

const listEntities = Object.values(entities);
export const databaseProvider = TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot({})],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        return {
            type: 'postgres',
            host: configService.get<string>('PGHOST'),
            port: configService.get<number>('PGPORT'),
            username: configService.get<string>('PGUSER'),
            password: configService.get<string>('PGPASSWORD'),
            database: configService.get<string>('PGDATABASE'),
            entities: listEntities,
            synchronize: true,
            logging: false,
            cache: {
                duration: 1500,
            },
        };
    },
});
