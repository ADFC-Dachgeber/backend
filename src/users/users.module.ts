import { Module } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';
import { UsersService } from './users/users.service';

@Module({
  providers: [
    UsersService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule { }
