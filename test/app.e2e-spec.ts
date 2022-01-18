import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as fs from 'fs';
import * as path from 'path';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import Fastify from 'fastify';
import { addMediaParser } from './../src/mediaParser';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const fastify = Fastify({
      logger: false,
    });
    addMediaParser(fastify);

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(fastify),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/words (POST)', async () => {
    const img = path.join(__dirname, 'exampleBW.png');
    const data = fs.readFileSync(img, { encoding: 'binary' });

    const req = request(app.getHttpServer())
      .post('/words')
      .set('Content-Type', 'image/png');
    req.write(data);

    req.expect(200).expect('Hello World!');
    return 'ok';
  });
});
