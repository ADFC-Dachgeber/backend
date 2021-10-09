import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from './../src/users/users.service';
import { AccountsService } from './../src/accounts/accounts.service';
import { PrismaClient } from '.prisma/client';
import { PRISMA } from '../src/const';
import { ResetTokensService } from '../src/reset-tokens/reset-tokens.service';

describe('Password reset (e2e)', () => {
    let app: INestApplication;
    let accountsService: AccountsService;
    let usersService: UsersService;
    let resetTokenService: ResetTokensService;
    let prisma: PrismaClient;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prisma = moduleFixture.get<PrismaClient>(PRISMA);
        accountsService = moduleFixture.get<AccountsService>(AccountsService);
        resetTokenService = moduleFixture.get<ResetTokensService>(ResetTokensService);
        usersService = moduleFixture.get<UsersService>(UsersService);

        app = moduleFixture.createNestApplication();
        await app.init();

        await prisma.account.deleteMany({});

        const account = await accountsService.create();
        await usersService.create({
            name: "Max Musternann",
            email: "max.mustermann@example.com",
            accountId: account.id,
            password: "abcde",
        });
    });

    describe('A user has forgotten his/her password hence resets.', () => {
        it('/auth/login (POST)', async () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: "max.mustermann@example.com",
                    password: "foo?",
                })
                .expect(401);
        });

        it('/reset-token (POST)', async () => {
            return request(app.getHttpServer())
                .post('/reset-tokens')
                .send({
                    email: "max.mustermann@example.com",
                })
                .expect(201);
        });
    });

    describe('A non-existing user requests a reset token', () => {
        it('/reset-token (POST)', async () => {
            return request(app.getHttpServer())
                .post('/reset-tokens')
                .send({
                    email: "info@abc.com",
                })
                .expect(404);
        });
    });

    describe('With an existing valid reset token, a user sets his password', () => {
        it('/auth/reset-password (PATCH)', async () => {
            const user = await usersService.findByEmail('max.mustermann@example.com');
            const resetToken = await resetTokenService.create(user);

            return request(app.getHttpServer())
                .patch('/auth/reset-password')
                .send({
                    resetToken: resetToken.token,
                    password: "foo!"
                })
                .expect(200);
        });
    });
});
