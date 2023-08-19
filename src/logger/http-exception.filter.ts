import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { LoggerService } from './logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new LoggerService(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus ? exception.getStatus() : 500;
    const message = exception.message || 'Internal server error';

    if (status === 500) {
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    } else {
      response.status(status).json(exception.getResponse());
    }
    this.logger.error(message);
  }
}
