import {Test} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication} from '@nestjs/common';
import {AppModule} from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
        .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
  });

  it('/_ah/health (GET)', () => {
    return request(app.getHttpServer())
        .get('/_ah/health')
        .expect(200)
        .expect('ok');
  });

  afterAll(async () => {
    await app.close();
  });
});
