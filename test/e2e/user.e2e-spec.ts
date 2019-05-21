import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import {UserModule} from '../../src/user/user.module';
import {UserService} from '../../src/user/user.service';

describe('User', () => {
    const userService = { findAll: () => ['test'] };

    let app: INestApplication;

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

    it('/user (GET)', () => {
        return request(app.getHttpServer())
            .get('/user')
            .expect(200)
            .expect({data: userService.findAll()});
    });

    afterAll(async () => {
        await app.close();
    });
});
