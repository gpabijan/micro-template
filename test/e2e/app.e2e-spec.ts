import {Test} from '@nestjs/testing';
import * as request from 'supertest';
import {UserService} from '../../src/user/user.service';
import {UserModule} from '../../src/user/user.module';
import {INestApplication} from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userService = { findAll: () => ['test'] };


  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    })
        .overrideProvider(UserService)
        .useValue(userService)
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
