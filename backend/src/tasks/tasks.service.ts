import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  private async validateTaskExists(id: number): Promise<Task> {
    const task = await this.taskRepository.findTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }

  async findAllTasks(): Promise<Task[]> {
    return await this.taskRepository.findAllTasks();
  }

  async findOneTask(id: number): Promise<Task> {
    return await this.validateTaskExists(id);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.validateTaskExists(id);
    return await this.taskRepository.updateTask(id, updateTaskDto);
  }

  async removeTask(id: number): Promise<void> {
    await this.validateTaskExists(id);
    await this.taskRepository.deleteTask(id);
  }
}
