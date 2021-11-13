import { Controller, Get} from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { Public } from '../auth/metadata';
import { DbHealthIndicator } from './db-health-indicator';


@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly dbHealthIndicator: DbHealthIndicator,
      ) {}
    
      @Public()
      @Get()
      @HealthCheck()
      check() {
        return this.health.check([
        //   () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
          () => this.dbHealthIndicator.isHealthy(),
        ]);
      }
}
