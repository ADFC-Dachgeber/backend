import { Test, TestingModule } from '@nestjs/testing';
import { DachgebersController } from './dachgebers.controller';
import { GeoJSON } from 'geojson';
import { AccountsModule } from '../accounts/accounts.module';
import { AccountsService } from '../accounts/accounts.service';
import { DatabaseModule } from '../database/database.module';
import { PrismaClient } from '.prisma/client';
import { PRISMA } from '../const';
import { DachgebersService } from './dachgebers.service';

describe('DachgebersController', () => {
  let controller: DachgebersController;
  let accountsService: AccountsService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule, DatabaseModule,],
      providers: [DachgebersService,],
      controllers: [DachgebersController,],
    }).compile();

    prisma = module.get<PrismaClient>(PRISMA);
    accountsService = module.get<AccountsService>(AccountsService);
    controller = module.get<DachgebersController>(DachgebersController);

    await prisma.account.deleteMany({});
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('returns existing Dachgebers in GeoJSON format', async () => {
      await accountsService.create({
        description: 'There are cats and dogs!',
        location: [0, 0],
      });
      await accountsService.create({
        description: 'It can be cosier...',
        location: [1, 2],
      });

      const expected: GeoJSON = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [0, 0],
            },
            properties: {
              description: 'There are cats and dogs!',
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [1, 2],
            },
            properties: {
              description: 'It can be cosier...',
            }
          }
        ],
      };
      const result = await controller.get();
      expect(result).toStrictEqual(expected);
    });
  });
});
