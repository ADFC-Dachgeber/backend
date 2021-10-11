import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DatabaseModule } from './database/database.module';
import { ResetTokensModule } from './reset-tokens/reset-tokens.module';
import { DEFAULT_THROTTLE_LIMIT, DEFAULT_THROTTLE_TTL } from './const';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: DEFAULT_THROTTLE_TTL,
      limit: DEFAULT_THROTTLE_LIMIT,
    }),
    AccountsModule,
    AuthModule,
    UsersModule,
    DatabaseModule,
    ResetTokensModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
