import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.createTask(createTaskDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Task created successfully',
      data: task,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const tasks = await this.tasksService.findAllTasks();
    return {
      statusCode: HttpStatus.OK,
      message: 'Tasks retrieved successfully',
      data: tasks,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const task = await this.tasksService.findOneTask(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Task retrieved successfully',
      data: task,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.updateTask(id, updateTaskDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Task updated successfully',
      data: task,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.tasksService.removeTask(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Task deleted successfully',
    };
  }
}
