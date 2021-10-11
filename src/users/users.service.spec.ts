import { PrismaClient, User } from '.prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PRISMA } from '../const';
import { AccountsService } from '../accounts/accounts.service';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { AccountsModule } from '../accounts/accounts.module';

describe('UsersService', () => {
  let service: UsersService;
  let accountsService: AccountsService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule, DatabaseModule],
      providers: [UsersService],
    }).compile();

    prisma = module.get<PrismaClient>(PRISMA);
    accountsService = module.get<AccountsService>(AccountsService);
    service = module.get<UsersService>(UsersService);

    await prisma.account.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a user', async () => {
      const account = await accountsService.create({
        description: '',
        location: [0, 0],
      });
      const newUser: Omit<User, 'id'> = {
        name: 'Max Mustermann',
        email: 'max.mustermann@example.com',
        accountId: account.id,
        password: 'abcefg',
      };
      await service.create(newUser);
      const {
        id,
        password: pw,
        ...createdUser
      } = await prisma.user.findUnique({ where: { email: newUser.email } });
      const { password, ...expectedUser } = newUser;
      expect(createdUser).toStrictEqual(expectedUser);
    });
  });

  describe('validate', () => {
    describe('when the user does not exist or password is wrong', () => {
      it('returns null', async () => {
        const username = 'max.mustermann@example.com';
        const password = 'abcd';
        expect(await service.validate(username, password)).toBeNull();
      });
    });
    describe('when the username and password are correct', () => {
      it('returns the user', async () => {
        const username = 'max.mustermann@example.com';
        const password = 'abcd';
        const account = await accountsService.create({
          description: 'blah',
          location: [1, 1],
        });
        const newUser: Omit<User, 'id'> = {
          email: username,
          name: 'Max Mustermann',
          accountId: account.id,
          password,
        };
        await service.create(newUser);
        const { password: pw, ...expectedUser } = newUser;
        const { id, ...foundUser } = await service.validate(username, password);
        expect(foundUser).toStrictEqual(expectedUser);
      });
    });
  });
});
