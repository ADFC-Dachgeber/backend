import { PrismaClient } from '@prisma/client';
import { ResetTokensService } from '../reset-tokens/reset-tokens.service';
import { ResetTokenGuard } from './reset-token.guard';

describe('ResetTokenGuard', () => {
  const prismaClient: PrismaClient = new PrismaClient();
  const resetTokensService: ResetTokensService = new ResetTokensService(
    prismaClient,
  );

  it('should be defined', () => {
    expect(new ResetTokenGuard(resetTokensService)).toBeDefined();
  });
});
