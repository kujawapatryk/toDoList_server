import { Controller, Get, Param, Patch, Post } from "@nestjs/common";

@Controller('tasks')
export class TasksController {

  @Get()
  getTasks(){
    return "Dostęp GET";
  }

  @Post('/:id')
  createTask(@Param('id') id:string){
    return "Dostęp POST ";
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string){
    return "Dostęp Patch";
  }

}
