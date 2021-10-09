import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, User } from 'prisma/prisma-client';
import * as bcrypt from 'bcrypt';
import { PRISMA, SALT_ROUNDS } from '../const';

@Injectable()
export class UsersService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async find(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    const u = await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
    const { password, ...rest } = u;
    return rest;
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.findByEmail(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...rest } = user;
      return rest;
    } else {
      return null;
    }
  }

  async setPassword(user: User, password: string): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await bcrypt.hash(user.password, SALT_ROUNDS),
      },
    });
  }
}
