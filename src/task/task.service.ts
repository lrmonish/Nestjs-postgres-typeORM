import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { createTask } from './dto/createTask.dto';
import { TaskStatus } from './taskStatusEnum';
import { UpdateDto } from './dto/UpdateTask.dto';
import { SearchDto } from './dto/searchTask.dto';
import { TaskRepository } from './task.Repository';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: TaskRepository) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createTask(createTask: createTask): Promise<Task> {
    const { title, description } = createTask;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async deleteById(id: string): Promise<string> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return result.affected === 1 ? 'Deleted Successfully' : 'Failed';
  }

  async update(id: string, updateTask: UpdateDto) {
    const res = await this.taskRepository.findOne({ where: { id } });

    if (!res) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    res.title = updateTask.title;
    res.description = updateTask.description;
    res.status = updateTask.status;
    return this.taskRepository.save(res);
  }

  async getTask(searchTask: SearchDto) {
    const { search, status } = searchTask;

    const query: SelectQueryBuilder<Task> =
      this.taskRepository.createQueryBuilder('task');

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async search(filter: SearchDto) {
    return await this.getTask(filter);
  }
}
