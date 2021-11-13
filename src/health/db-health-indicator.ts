import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { PrismaClient } from '.prisma/client';
import { DB_HEALTH_INDICATOR_KEY, PRISMA } from '../const';

@Injectable()
export class DbHealthIndicator extends HealthIndicator {
    constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {
        super();
    }

    async isHealthy(): Promise<HealthIndicatorResult> {
        const result = await this.prisma.$executeRawUnsafe('select 1');

        if (result) {
            return this.getStatus(DB_HEALTH_INDICATOR_KEY, true);
        }
        throw new HealthCheckError('Dogcheck failed', false);
    }
}