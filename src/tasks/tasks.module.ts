import { Module } from '@nestjs/common';
import { TasksController } from "./tasks.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from  './tasks.entity'
import { TasksService } from './tasks.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tasks]),
  ],
  controllers: [ TasksController],
  providers: [
      TasksService,
  ],
  exports: [TasksService],
})
export class TasksModule {}
