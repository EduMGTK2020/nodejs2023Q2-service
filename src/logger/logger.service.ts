import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';
import * as fs from 'fs';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService extends ConsoleLogger {
  private readonly fileName = 'logs.txt';

  log(message: string) {
    const logMessage = `[${new Date().toISOString()}] LOG ${message}\n`;
    fs.appendFile(this.fileName, logMessage, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  error(message: string) {
    const logMessage = `[${new Date().toISOString()}] ERROR ${message}\n`;
    fs.appendFile(this.fileName, logMessage, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  warn(message: string) {
    const logMessage = `[${new Date().toISOString()}] WARN ${message}\n`;
    fs.appendFile(this.fileName, logMessage, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}
