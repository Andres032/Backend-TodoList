import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateTask } from "./dto/createTask.dto";
import { TaskService } from "./task.service";

@ApiTags('Task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {};

    @Get('/all')
    async allTask(){
        return {
            data: await this.taskService.listAllTask(),
            message: 'list all task succesfully',
            code: HttpStatus.OK
        }
    };

    @Get('/:id')
    async taskById(
        @Param('id') id: string
    ){
        return {
            data: await this.taskService.taskById(id),
            message: 'search task by id succesfully',
            code: HttpStatus.OK
        }
    };

    @Post('/create')
    async createTask(
        @Body() data: CreateTask
    ){
        return {
            data: await this.taskService.createTask(data),
            message: 'create task succesfully',
            code: HttpStatus.CREATED
        }
    };

    @Put('/update-task/:id')
    async updateTask(
        @Param('id') id: string,
        @Body() data: CreateTask
    ){
        return {
            data: await this.taskService.updateTask(id, data),
            message: 'change status task succesfully',
            code: HttpStatus.OK
        }
    };

    @Patch('/change-status/:id')
    async changeStatus(
        @Param('id') id: string
    ){
        return {
            data: await this.taskService.changeStatus(id),
            message: 'change status task succesfully',
            code: HttpStatus.OK
        }
    };

    @Delete('/:id')
    async deleteTask(
        @Param('id') id: string
    ){
        return {
            data: await this.taskService.deleteTask(id),
            message: 'delete task succesfully',
            code: HttpStatus.OK
        }
    };

}