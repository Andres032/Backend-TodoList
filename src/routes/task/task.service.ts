import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/database/entities";
import { Repository } from "typeorm";
import { CreateTask } from "./dto/createTask.dto";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private TaskRepository: Repository<Task>,
    ) {};

    async listAllTask(){
        const allTask = await this.TaskRepository.find();
        if(!allTask.length) throw new NotFoundException({
            message: 'Not found tasks'
        });

        return allTask
    };

    async taskById(id: string){
        const task = await this.TaskRepository.findOne({id});
        if(!task) throw new NotFoundException({
            message: 'Not found task'
        });

        return task;
    };

    async createTask(data: CreateTask){
        const existTask = await this.TaskRepository.findOne({
            tittle: data.tittle
        });
        if(existTask) throw new ConflictException({
            message: 'A task with that title already exists'
        });
        const taskInstacia = this.TaskRepository.create({
            tittle: data.tittle,
            description: data.description,
            author: data.author,
            status: false,
        });
        await this.TaskRepository.save(taskInstacia);

        return 'Ok'
    };

    async updateTask(id: string, data: CreateTask){
        const task = await this.TaskRepository.findOne({id});
        if(!task) throw new NotFoundException({
            message: 'Not found task'
        });
        await this.TaskRepository.update({id: task.id},{
            tittle: data.tittle,
            description: data.description,
            author: data.author,
        });

        return 'Ok'
    };

    async changeStatus(id: string){
        const task = await this.TaskRepository.findOne({id});
        if(!task) throw new NotFoundException({
            message: 'Not found task'
        });
        let newStatus = true;
        if(task.status === true) newStatus = false
        await this.TaskRepository.update({id: task.id},{status: newStatus});

        return { status: newStatus }
    };

    async deleteTask(id: string){
        const task = await this.TaskRepository.findOne({id});
        if(!task) throw new NotFoundException({
            message: 'Not found task'
        });
        await this.TaskRepository.delete(task.id);

        return task;
    };
}