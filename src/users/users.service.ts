import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from 'prisma/prisma-client';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaClient) { }
    async find(email: string): Promise<User | undefined> {
        return this.prisma.user.findFirst({
            where: { email }
        });
    }
}
