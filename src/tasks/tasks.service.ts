import {Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TasksInterface } from "src/types";
import { getConnection,  DataSource, Repository, DeleteResult } from "typeorm";
import { AddTaskDto } from "./dto/add-task.dto";
import { Tasks } from "./tasks.entity";

@Injectable()
export class TasksService{

    private content: string;
    private done: boolean;

    constructor(

        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
    ) {}

    async create(item: AddTaskDto): Promise<TasksInterface> {

        if (item.done === undefined) {
            item.done = false;
        }

        const task = await this.tasksRepository.create(item);

        return await this.tasksRepository.save(task)
    }

    async getTasks():Promise<TasksInterface[]> {

        return await this.tasksRepository.find({
            order: {
                id: 'DESC',
            }
        });
    }

    async deleteTask(id:number):Promise<number>{

        const result = await this.tasksRepository.delete(id);
        return result.affected;
    }

    async updateTask(id: number, done: boolean):Promise<number>{

        const result = await this.tasksRepository.update(id,{done});
        return result.affected;
    }

}