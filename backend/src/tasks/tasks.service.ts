import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}
  createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
  }

  findAllTasks() {
    return this.taskRepository.findAllTasks();
  }

  findOneTask(id: number) {
    return this.taskRepository.findTaskById(id);
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.updateTask(id, updateTaskDto);
  }

  removeTask(id: number) {
    return this.taskRepository.deleteTask(id);
  }
}
