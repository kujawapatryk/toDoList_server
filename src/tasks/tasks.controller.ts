import {Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AddTaskDto } from "./dto/add-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";


@Controller('tasks')
export class TasksController {

  constructor(
     private tasksService: TasksService
  ) {}

  @Get('/')
  async getTasks(){
   return await this.tasksService.getTasks();
  }

  @Post('/')
  async createTask(@Body() item: AddTaskDto){
   return await this.tasksService.create(item);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number){
    if (isNaN(id)) {
      return { message: 'tryLater', status: 'fail' };
    }
    const result = await this.tasksService.deleteTask(Number(id));

    return result === 0
        ? { message: 'tryLater', status: 'fail' }
        : { message: 'taskDeleted', status: 'success' };
  }

  @Patch('/:id')
  async updateTask(
      @Param('id' ) id: number,
      @Body() updateTask: UpdateTaskDto
  ){
    if (isNaN(id)) {
      return { message: 'tryLater', status: 'fail' };
    }
    const result =  await this.tasksService.updateTask(Number(id),updateTask.done);
    return result === 0
        ? { message: 'tryLater', status: 'fail' }
        : { message: 'taskConfirmation', status: 'success' };
  }

}
