import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity.js';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TaskModule {}
