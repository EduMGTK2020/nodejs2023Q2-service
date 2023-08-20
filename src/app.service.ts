import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {}
  getHello(): string {
    //for check uncomment only one of line
    // throw new Error('Test for uncaughtException');
    // Promise.reject(new Error('Test for unhandledRejection'));
    //
    //for test warn log level uncomment line below
    // this.logger.warn('Test WARN log level');
    return 'Hello World!';
  }
}
