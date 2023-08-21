import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class RequestResponseMiddleware implements NestMiddleware {
  constructor(private readonly Logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, body, originalUrl, params } = req;

    const message = `Req - method:${method} - url:${originalUrl} - params:${JSON.stringify(
      params,
    )} - body:${JSON.stringify(body)}`;
    this.Logger.log(message);

    res.on('finish', () => {
      const { statusCode } = res;
      const message = `Res - method:${method} - url:${originalUrl} - status:${statusCode}`;
      this.Logger.log(message);
    });
    next();
  }
}
