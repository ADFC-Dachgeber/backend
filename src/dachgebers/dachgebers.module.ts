import { Module } from '@nestjs/common';
import { AccountsModule } from '../accounts/accounts.module';
import { DachgebersController } from './dachgebers.controller';
import { DachgebersService } from './dachgebers.service';

@Module({
  imports: [AccountsModule],
  controllers: [DachgebersController],
  providers: [DachgebersService],
})
export class DachgebersModule {}
