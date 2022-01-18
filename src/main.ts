/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import Fastify from 'fastify';
import { AppModule } from './app.module';
import { addMediaParser } from './mediaParser';

async function bootstrap() {
  const fastify = Fastify({
    logger: false,
  });
  addMediaParser(fastify);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastify),
    { bodyParser: true },
  );
  await app.listen(3000);
}
bootstrap();
