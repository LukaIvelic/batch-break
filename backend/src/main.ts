import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { setupApp } from './commons/setup';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  setupApp(app);

  await app.listen(8000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();