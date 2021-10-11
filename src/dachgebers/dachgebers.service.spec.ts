import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from '../accounts/accounts.module';
import { DachgebersService } from './dachgebers.service';

describe('DachgebersService', () => {
  let service: DachgebersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule,],
      providers: [DachgebersService],
    }).compile();

    service = module.get<DachgebersService>(DachgebersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
