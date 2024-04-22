import {
  Controller,
  Param,
  Get,
  Body,
  Post,
  Delete,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { createTask } from './dto/createTask.dto';
import { UpdateDto } from './dto/UpdateTask.dto';
import { SearchDto } from './dto/searchTask.dto';
import { TaskAuthGuard } from './task.auth.guard';
import { Role } from '../auth/enum/permissions';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(TaskAuthGuard, RolesGuard)
@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':id')
  @Roles(Role.USER)
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  async createTask(@Body() createTask: createTask): Promise<Task> {
    return await this.taskService.createTask(createTask);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteById(@Param('id') id: string) {
    return await this.taskService.deleteById(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  async update(@Param('id') id: string, @Body() updateTask: UpdateDto) {
    return await this.taskService.update(id, updateTask);
  }

  @Get()
  @Roles(Role.USER)
  async getAll(@Query() searchQuery: SearchDto) {
    if (Object.keys(searchQuery).length) {
      return this.taskService.getTask(searchQuery);
    } else {
      return this.taskService.getTask(searchQuery);
    }
  }
}
