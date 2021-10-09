import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { ResetTokensController } from './reset-tokens.controller';
import { ResetTokensService } from './reset-tokens.service';

describe('ResetTokensController', () => {
  let controller: ResetTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule],
      controllers: [ResetTokensController],
      providers: [ResetTokensService],
    }).compile();

    controller = module.get<ResetTokensController>(ResetTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
