import { Injectable } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Hello1')
@Controller('demo')
export class AppService {
  @ApiTags('Hello')
  getHello(): string {
    //for check uncomment only one of line
    //throw new Error('Test for uncaughtException');
    //Promise.reject(new Error('Test for unhandledRejection'));
    return 'Hello World!';
  }
}
