import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hej decace maleni, javljam se iz Dockera';
  }
}
