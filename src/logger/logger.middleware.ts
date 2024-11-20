import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;

    this.loggerService.info('Incoming request', {
      method,
      url,
      query,
      body,
    });

    res.on('finish', () => {
      this.loggerService.info('Response sent', {
        statusCode: res.statusCode,
        url,
      });
    });

    next();
  }
}
