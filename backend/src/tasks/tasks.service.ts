import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  private async validateTaskExists(id: number): Promise<Task> {
    const task = await this.taskRepository.findTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.createTask(createTaskDto);
  }

  async findAllTasks() {
    return await this.taskRepository.findAllTasks();
  }

  async findOneTask(id: number) {
    await this.validateTaskExists(id);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    await this.validateTaskExists(id);
    return await this.taskRepository.updateTask(id, updateTaskDto);
  }

  async removeTask(id: number) {
    await this.validateTaskExists(id);
    return await this.taskRepository.deleteTask(id);
  }
}
