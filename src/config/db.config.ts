import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    type: 'mysql',
    logging: true,
    host: process.env.DB_MAIN_HOST || 'localhost',
    port: process.env.DB_MAIN_PORT || 3306,
    username: process.env.DB_MAIN_USER || 'root',
    password: process.env.DB_MAIN_PASSWORD || 'westeros',
    database: process.env.DB_MAIN_DATABASE || 'copa2022',
    autoLoadEntities: true,
    //synchronize: true,
    entities: ['dist/src/**/entities/*.entity{.ts,.js}'],
    migrations: ['../shared/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: '../shared/migrations',
    },
  };
});
