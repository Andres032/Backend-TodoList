import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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
    }
}