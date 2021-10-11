import { Module } from '@nestjs/common';
import { DachgebersController } from './dachgebers.controller';

@Module({
  controllers: [DachgebersController]
})
export class DachgebersModule {}
