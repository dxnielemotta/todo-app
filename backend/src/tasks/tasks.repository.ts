import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        completed: createTaskDto.completed,
      },
    });
  }

  async findAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findTaskById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
