import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { serve, setup } from 'swagger-ui-express';
import { readFileSync } from 'fs';
import * as yaml from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4000;

  const fileApiYaml = readFileSync('doc/api.yaml', 'utf8');
  const swaggerDoc = yaml.parse(fileApiYaml);
  app.use('/doc', serve, setup(swaggerDoc));

  await app.listen(port);
}
bootstrap();
