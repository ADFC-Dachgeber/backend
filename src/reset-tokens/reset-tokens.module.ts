import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../database/database.module';
import { ResetTokensController } from './reset-tokens.controller';
import { ResetTokensService } from './reset-tokens.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ResetTokensController],
  providers: [ResetTokensService],
  exports: [ResetTokensService],
})
export class ResetTokensModule {}
