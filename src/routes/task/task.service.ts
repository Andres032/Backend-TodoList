import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskService {
    constructor(

    ) {};

    async listAllTask(){
        return 'HOLA ESTE ES EL SERVICIO';
    };
}