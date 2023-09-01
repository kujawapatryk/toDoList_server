import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDB } from "./config/config";
import { ConfigModule } from "@nestjs/config";
import { DataSource } from 'typeorm';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot( {isGlobal: true,}),
    TypeOrmModule.forRoot(configDB),
    TasksModule],
  controllers: [AppController, TasksController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
