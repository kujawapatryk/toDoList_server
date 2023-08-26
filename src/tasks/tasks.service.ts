import {Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { configDB } from "src/config/config";
import { TasksInterface } from "src/types";
import { getConnection,  DataSource, Repository } from "typeorm";
import { AddTaskDto } from "./dto/add-task.dto";
import { Tasks } from "./tasks.entity";

@Injectable()
export class TasksService{

    private content: string;
    private done: boolean;

    constructor(

        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,

    ) {

    }

    async create(item: AddTaskDto) {
        if (item.done === undefined) {
            item.done = true;
        }
        const task = this.tasksRepository.create(item);
        this.tasksRepository.save(task)

    }

    async getTasks() {
        return this.tasksRepository.find();
    }

    async deleteTask(id:number){
        return this.tasksRepository.delete(id)
    }

    async updateTask(id: number){
        this.tasksRepository.update(id,{done: true})
        return this.tasksRepository.findBy({id});
    }

}