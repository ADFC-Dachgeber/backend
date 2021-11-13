import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { DatabaseModule } from '../database/database.module';
import { DbHealthIndicator } from './db-health-indicator';

@Module({
  imports: [
    TerminusModule,
    DatabaseModule,
    HttpModule
  ],
  controllers: [
    HealthController
  ],
  providers: [
    DbHealthIndicator,
  ]
})
export class HealthModule { }
