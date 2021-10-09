import { Test, TestingModule } from '@nestjs/testing';
import { ResetTokensController } from './reset-tokens.controller';

describe('ResetTokensController', () => {
  let controller: ResetTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetTokensController],
    }).compile();

    controller = module.get<ResetTokensController>(ResetTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
