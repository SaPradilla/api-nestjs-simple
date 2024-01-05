import { Controller, Get,Post,Put,Delete,Body, Param, NotFoundException } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";
@Controller('tasks')
export class TaskController {

    constructor(private readonly taskService : TaskService){}

    @Get()
    async getAllTask (){
        return await this.taskService.getAllTask()
    }
    @Post()
    async createTask(@Body() data: Task){
        return await this.taskService.createTask(data)
    }
    @Get(':id')
    async getTaskById(@Param('id') id: string ){

        const taskFound = await this.taskService.getTaskById(Number(id))
        if(!taskFound) throw new NotFoundException('Tarea no encontrada')
        return taskFound
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string ){
        try {
            return await this.taskService.deleteTask(Number(id))
        } catch (e) {
            throw new NotFoundException('Tarea no existe')
        }
    }
    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() data: Task ){
        try {
            return await this.taskService.updateTask(Number(id),data)
        } catch (error) {
            throw new NotFoundException('Tarea no existe')
            
        }
    }
    
}