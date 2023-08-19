import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as process from 'process';
import * as yaml from 'js-yaml';

import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(new LoggerService());

  const port = process.env.PORT || 4000;

  app.useGlobalPipes(new ValidationPipe());

  const GEN_DOCS = process.env.GEN_DOCS || 'false';

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Task #7: Implementation Home Library Service: Part 1')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, document, {
    swaggerOptions: {
      validatorUrl: null,
      displayRequestDuration: true,
    },
  });

  if (GEN_DOCS === 'true') {
    const yamlDoc = yaml.dump(document, { noRefs: true });
    await fs.promises.writeFile('doc/api.yaml', yamlDoc);
  }

  await app.listen(port);
}
bootstrap();
