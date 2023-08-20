import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService extends ConsoleLogger {
  private readonly fileToLogName = path.join(
    `./${process.env.APP_LOG_DIR || 'logs'}`,
    'log.txt',
  );

  private readonly fileToErrorName = path.join(
    `./${process.env.APP_LOG_DIR || 'logs'}`,
    'error.txt',
  );

  private readonly maxFileSize =
    1024 * ((+process.env.APP_LOG_FILESIZE || 30) - 1);

  logMessage(type: string, message: string) {
    const messageToLog = `[${new Date().toISOString()}] ${type} ${message}\n`;

    process.stdout.write(messageToLog);

    this.logRotate();

    fs.appendFile(this.fileToLogName, messageToLog, (err) => {
      if (err) {
        console.error(err);
      }
    });

    if (type == 'ERROR') {
      fs.appendFile(this.fileToErrorName, messageToLog, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }

  private logRotate() {
    if (fs.existsSync(this.fileToLogName)) {
      const fileSize = fs.statSync(this.fileToLogName).size;
      if (fileSize >= this.maxFileSize) {
        const backupFileName = this.fileToLogName.replace(
          'log.txt',
          `log-${Date.now()}.txt`,
        );
        fs.renameSync(this.fileToLogName, backupFileName);
        fs.openSync(this.fileToLogName, 'w');
      }
    }
    if (fs.existsSync(this.fileToErrorName)) {
      const fileErrSize = fs.statSync(this.fileToErrorName).size;
      if (fileErrSize >= this.maxFileSize) {
        const backupFileName = this.fileToErrorName.replace(
          'error.txt',
          `error-${Date.now()}.txt`,
        );
        fs.renameSync(this.fileToErrorName, backupFileName);
        fs.openSync(this.fileToErrorName, 'w');
      }
    }
  }

  log(message: string, context?: string) {
    this.logMessage('LOG', message + ' - ' + context);
  }

  error(message: string) {
    this.logMessage('ERROR', message);
  }

  warn(message: string) {
    this.logMessage('WARN', message);
  }
}
