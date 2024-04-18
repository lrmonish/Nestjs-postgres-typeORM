import {
  Controller,
  Param,
  Get,
  Body,
  Post,
  Delete,
  Put,
  Search,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { createTask } from './dto/createTask.dto';
import { UpdateDto } from './dto/UpdateTask.dto';
import { SearchDto } from './dto/searchTask.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  async createTask(@Body() createTask: createTask): Promise<Task> {
    return await this.taskService.createTask(createTask);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.taskService.deleteById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  async update(@Param('id') id: string, @Body() updateTask: UpdateDto) {
    return await this.taskService.update(id, updateTask);
  }

  @Get()
  async getAll(@Query() searchQuery: SearchDto) {
    if (Object.keys(searchQuery).length) {
      return this.taskService.search(searchQuery);
    } else {
      return this.taskService.search(searchQuery);
    }
  }
}
