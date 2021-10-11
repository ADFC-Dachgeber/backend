import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { DEFAULT_THROTTLE_TTL } from '../const';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { ResetTokensService } from './reset-tokens.service';

describe('ResetTokensService', () => {
  let service: ResetTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        ThrottlerModule.forRoot({
          ttl: DEFAULT_THROTTLE_TTL,
          limit: Infinity,
        }),
      ],
      providers: [ResetTokensService],
    }).compile();

    service = module.get<ResetTokensService>(ResetTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
