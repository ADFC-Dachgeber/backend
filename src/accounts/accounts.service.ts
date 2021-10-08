import { Account, PrismaClient } from '.prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { PRISMA } from '../const';

@Injectable()
export class AccountsService {
    constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) { }

    async create(): Promise<Account> {
        return await this.prisma.account.create({ data: {} });
    }
}
