import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, } from "@nestjs/common";
import { AddTaskDto } from "./dto/add-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";
import { Response } from 'express';

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
  async deleteTask(@Param('id') id: number, @Res() res: Response){

    if (isNaN(id)) {
      return { message: 'tryLater', status: 'fail' };
    }

    const result = await this.tasksService.deleteTask(Number(id));

    result === 0
        ?  res.status(HttpStatus.OK).json({ message: 'tryLater', status: 'fail' })
        :  res.status(HttpStatus.BAD_REQUEST).json({ message: 'taskDeleted', status: 'success' })
  }

  @Patch('/:id')
  async updateTask(
      @Param('id') id: number,
      @Body() updateTask: UpdateTaskDto,
      @Res() res: Response
  ){

    if (isNaN(id)) {
      return { message: 'tryLater', status: 'fail' };
    }

    const result =  await this.tasksService.updateTask(Number(id),updateTask.done);

    result === 0
        ?  res.status(HttpStatus.OK).json({ message: 'tryLater', status: 'fail' })
        :  res.status(HttpStatus.BAD_REQUEST).json({ message: 'taskDeleted', status: 'success' })
  }


}
