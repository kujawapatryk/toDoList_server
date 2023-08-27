import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

export const configDB: TypeOrmModuleOptions ={
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
  "dist/**/**.entity{.ts,.js}"
],
  bigNumberStrings: false,
  logging: true,
  synchronize: true
}

export const configCors = process.env.CORS
