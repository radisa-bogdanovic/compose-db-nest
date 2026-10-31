import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  getRoot() {
    return {
      message: 'NEStJS i postgress RADI U DOCKERU!',
      status: 'OK',
    };
  }

  @Get('health')
  async getHealth() {
    const result = (await this.dataSource.query('SELECT NOW() AS now')) as any;

    return { status: 'ok', database: 'connected', time: result[0].now };
  }
}
