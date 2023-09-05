import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

export const configDB: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  entities: ['dist/**/**.entity{.ts,.js}'],
  bigNumberStrings: false,
  logging: true,
  synchronize: true,
};

export const configCors = process.env.CORS
