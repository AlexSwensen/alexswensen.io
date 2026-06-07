import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

type ProfileResponse = {
  username: string;
  links: unknown[];
};

describe('Profiles (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/profiles/alex (GET)', () => {
    const server = app.getHttpServer() as Parameters<typeof request>[0];

    return request(server)
      .get('/profiles/alex')
      .expect(200)
      .expect((res) => {
        const body = res.body as ProfileResponse;
        expect(body.username).toBe('alex');
        expect(Array.isArray(body.links)).toBe(true);
      });
  });
});
