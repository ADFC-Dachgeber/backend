import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '.prisma/client';
import { PRISMA } from '../src/const';

describe('AccountsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleFixture.get<PrismaClient>(PRISMA);
    app = moduleFixture.createNestApplication();

    await prisma.account.deleteMany({});

    await app.init();
  });

  describe('User is unauthorised', () => {
    it('/accounts (GET)', () => {
      return request(app.getHttpServer()).get('/accounts').expect(401);
    });
  });

  // describe('User requests with a valid token', () => {
  //   it('/accounts (GET)', () => {
  //     return request(app.getHttpServer())
  //       .get('/accounts')
  //       .expect(200)
  //       .expect('{}');
  //   });
  // });
});
