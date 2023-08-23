import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDB } from "./config/config";

@Module({
  imports: [
    TypeOrmModule.forRoot(configDB),
    TasksModule],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}
