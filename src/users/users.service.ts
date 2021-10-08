import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, User } from 'prisma/prisma-client';
import { PRISMA } from '../const';

@Injectable()
export class UsersService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}
  async find(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }
}
