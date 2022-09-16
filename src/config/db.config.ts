import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    logging: true,
    host: process.env.DB_MAIN_HOST || 'localhost',
    port: process.env.DB_MAIN_PORT || 5433,
    username: process.env.DB_MAIN_USER || 'postgres',
    password: process.env.DB_MAIN_PASSWORD || 'postgres',
    database: process.env.DB_MAIN_DATABASE || 'copa',
    autoLoadEntities: true,
    synchronize: true,
    entities: ['dist/src/**/entities/*.entity{.ts,.js}'],
    migrations: ['../shared/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: '../shared/migrations',
    },
  };
});
