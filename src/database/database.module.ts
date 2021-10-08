import { PrismaClient } from '.prisma/client';
import { Module } from '@nestjs/common';
import { PRISMA } from '../const';

@Module({
  providers: [
    {
      provide: PRISMA,
      useValue: new PrismaClient(),
    },
  ],
  exports: [PRISMA],
})
export class DatabaseModule {}
