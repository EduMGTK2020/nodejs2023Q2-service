import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';
import * as fs from 'fs';

const logDir = process.env.APP_LOG_DIR || 'logs';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService extends ConsoleLogger {
  private readonly fileName = `./${logDir}/logs.txt`;

  logMessage(type: string, message: string) {
    const messageToLog = `[${new Date().toISOString()}] ${type} ${message}\n`;
    process.stdout.write(messageToLog);
    fs.appendFile(this.fileName, messageToLog, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  log(message: string) {
    this.logMessage('LOG', message);
  }

  error(message: string) {
    this.logMessage('ERROR', message);
  }

  warn(message: string) {
    this.logMessage('WARN', message);
  }
}
