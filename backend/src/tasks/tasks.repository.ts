import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, completed } = createTaskDto;
    return this.prisma.task.create({
      data: {
        title,
        description,
        completed,
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

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { ...updateTaskDto },
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
