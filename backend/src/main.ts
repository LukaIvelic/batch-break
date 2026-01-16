import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { setupApp } from './commons/setup';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  app.useLogger(app.get(Logger));

  setupApp(app);

  await app.listen(8000, '0.0.0.0');

  const url = await app.getUrl();
  app.get(Logger).log(`Application is running on: ${url}/api`);
}

bootstrap();
