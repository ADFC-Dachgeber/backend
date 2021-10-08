import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, User } from 'prisma/prisma-client';
import * as bcrypt from 'bcrypt';
import { PRISMA, SALT_ROUNDS } from '../const';

@Injectable()
export class UsersService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) { }
  async find(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async create(user: Omit<User, 'id'>): Promise<Omit<User, "password">> {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    const u = await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      }
    });
    const { password, ...rest } = u;
    return rest;
  }
}
