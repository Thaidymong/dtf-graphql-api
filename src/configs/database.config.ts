import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_CONSTANT } from 'src/common/constants/database.constant';
import { SnakeNamingStrategy } from 'src/common/utils/strategies/snake-name.strategy';
import { DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

const configService = new ConfigService();

const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: configService.getOrThrow<string>('DB_HOST'),
  port: +configService.getOrThrow<number>('DB_PORT'),
  username: configService.getOrThrow<string>('DB_USERNAME'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.getOrThrow<string>('DB_NAME'),
  entities: [__dirname + '../../**/**/*entity{.ts,.js}'],
  migrations: [__dirname + '/../databases/migrations/*{.ts,.js}'],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: true,
  migrationsTableName: 'migrations',
  logger: 'file',
  name: DATABASE_CONSTANT.MYSQL_SLS,
  charset: 'utf8mb4',
};

export default databaseConfig;
