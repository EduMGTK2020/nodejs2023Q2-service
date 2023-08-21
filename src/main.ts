import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as process from 'process';
import * as yaml from 'js-yaml';

import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './logger/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = new LoggerService();
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  process.on('uncaughtException', (err: Error) => {
    new LoggerService().error(`${err.message}`);
  });

  process.on('unhandledRejection', (err: Error) => {
    new LoggerService().error(`${err.message}`);
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Task #7: Implementation Home Library Service: Part 3')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/doc', app, document, {
    swaggerOptions: {
      validatorUrl: null,
      displayRequestDuration: true,
    },
  });

  const yamlDoc = yaml.dump(document, { noRefs: true });
  await fs.promises.writeFile('doc/api.yaml', yamlDoc);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`App server started at port ${port}`);
}
bootstrap();
