import { Test, TestingModule } from '@nestjs/testing';
import { DachgebersController } from './dachgebers.controller';

describe('DachgebersController', () => {
  let controller: DachgebersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DachgebersController],
    }).compile();

    controller = module.get<DachgebersController>(DachgebersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
