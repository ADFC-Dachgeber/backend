import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { DEFAULT_THROTTLE_TTL } from '../const';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UsersModule,
        ThrottlerModule.forRoot({
          ttl: DEFAULT_THROTTLE_TTL,
          limit: Infinity,
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
