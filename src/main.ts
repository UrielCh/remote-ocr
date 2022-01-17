/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import Fastify, { FastifyRequest } from 'fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const fastify = Fastify({
    logger: false,
  });

  fastify.addContentTypeParser(
    /^image\/.*/,
    function (request: FastifyRequest, payload, done) {
      // const len = Number(request.headers['content-length']);
      const buffers = [];
      payload.on('data', (chunk) => {
        buffers.push(chunk);
      });
      payload.on('end', () => {
        done(null, Buffer.concat(buffers));
      });
    },
  );

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastify),
    { bodyParser: true },
  );
  await app.listen(3000);
}
bootstrap();
