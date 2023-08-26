import {Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { AddTaskDto } from "./dto/add-task.dto";
import { TasksService } from "./tasks.service";


@Controller('tasks')
export class TasksController {

  constructor(
     private tasksService: TasksService
      ) {
  }

  @Get('/')
  getTasks(){
   return this.tasksService.getTasks();
  }

  @Post('/')
  createTask(@Body() item: AddTaskDto){
   return this.tasksService.create(item);
   // return "Dostęp POST ";
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string){
    return this.tasksService.deleteTask(Number(id));
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string){
    return this.tasksService.updateTask(Number(id));
  }

}
