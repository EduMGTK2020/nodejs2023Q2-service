import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller()
@ApiTags('Index')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'index entry point',
  })
  @ApiOkResponse({
    description: 'hello message',
  })
  getHello(): string {
    // for check uncomment only one of line
    // throw new Error('Test for uncaughtException');
    // Promise.reject(new Error('Test for unhandledRejection'));
    return this.appService.getHello();
  }
}
