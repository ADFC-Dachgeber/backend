import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaClient } from '.prisma/client';
import { PRISMA } from '../src/const';
import { AccountsService } from '../src/accounts/accounts.service';
import { UsersService } from '../src/users/users.service';
import { AppController } from '../src/app.controller';

describe('DachgebersController (e2e)', () => {
  let app: INestApplication;
  let accountsService: AccountsService;
  let usersService: UsersService;
  let appController: AppController;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleFixture.get<PrismaClient>(PRISMA);

    appController = moduleFixture.get<AppController>(AppController);
    accountsService = moduleFixture.get<AccountsService>(AccountsService);
    usersService = moduleFixture.get<UsersService>(UsersService);
    app = moduleFixture.createNestApplication();

    await prisma.account.deleteMany({});

    await app.init();
  });

  describe('User is unauthorised', () => {
    it('/dachgebers (GET)', () => {
      return request(app.getHttpServer()).get('/dachgebers').expect(401);
    });
  });

  describe('User requests with a valid token', () => {
    it('/dachgebers (GET)', async () => {
      const account = await accountsService.create({
        description: 'blah',
        location: [0, 1],
      });
      const user = await usersService.create({
        name: 'Max Mustermann',
        email: 'max.mustermann@example.com',
        accountId: account.id,
        password: 'abcdefg',
      });
      const res = await appController.login({ user });
      const { accessToken } = res;

      return request(app.getHttpServer())
        .get('/dachgebers')
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .expect(
          '{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[0,1]},"properties":{"description":"blah"}}]}',
        );
    });
  });
});
