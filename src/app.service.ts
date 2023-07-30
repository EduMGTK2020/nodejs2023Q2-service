import { Injectable } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Hello1')
@Controller('demo')
export class AppService {
  @ApiTags('Hello')
  getHello(): string {
    return 'Hello World!';
  }
}
