import { DataSource } from 'typeorm';
import { DATABASE_CONFIG } from './constant.config';
import { UserEntity } from '../api/user/user.entity';

export default new DataSource({
  type: 'postgres',
  host: DATABASE_CONFIG.host,
  port: DATABASE_CONFIG.port,
  username: DATABASE_CONFIG.username,
  password: DATABASE_CONFIG.password,
  database: DATABASE_CONFIG.database,
  entities: [UserEntity],
  migrations: [__dirname + '/../../migrations/*.ts'],
  synchronize: true, //TODO: set to false after first run
  logging: DATABASE_CONFIG.logging,
  cache: true,
});
