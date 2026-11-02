import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity.js';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  create(data: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(data);
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task ${id} nije pronadjen u bazi!`);
    }
    return task;
  }

  async updateTask(id: number, data: Partial<Task>): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, data);
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Task ${id} nije pronadjen`);
    }
  }
}
