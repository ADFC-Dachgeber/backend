import { Account, Description, Location, PrismaClient } from '.prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { PRISMA } from '../const';

@Injectable()
export class AccountsService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async create(data: {
    description: string;
    location: [number, number];
  }): Promise<Account> {
    const { description, location } = data;
    return await this.prisma.account.create({
      data: {
        description: {
          create: {
            text: description,
          },
        },
        location: {
          create: {
            latitude: location[0],
            longitude: location[1],
          },
        },
      },
    });
  }

  async allWithDescriptionAndCoord(): Promise<
    ReadonlyArray<Account & { description: Description; location: Location }>
  > {
    return await this.prisma.account.findMany({
      include: { description: true, location: true },
      orderBy: { id: 'asc' },
    });
  }
}
