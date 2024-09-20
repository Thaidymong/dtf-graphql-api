import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';
import { HEALTH_CHECK } from './constants';
import { getConfig } from 'src/configs/base/get-config';
import { Public } from 'src/common/decorators';
import { format } from 'date-fns';

@SkipThrottle()
@Controller({
  path: HEALTH_CHECK,
  version: '1',
})
export class HealthCheckController {
  private readonly build: string = getConfig().healthCheckConfig.build;
  private readonly date: string;

  constructor(
    private health: HealthCheckService,
    private readonly ormIndicator: TypeOrmHealthIndicator,
  ) {
    const currentTimestamp = Date.now();
    const timestamp = this.build !== 'unknown' ? currentTimestamp : null;

    this.date = timestamp ? format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss') : 'unknown';
  }

  @Get()
  @Public()
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      () => ({
        app: {
          status: 'up',
          build: this.build,
          date: this.date,
        },
      }),
    ]);
  }

  @Get('database')
  @Public()
  @HealthCheck()
  checkDatabase(): Promise<HealthCheckResult> {
    return this.health.check([async (): Promise<HealthIndicatorResult> => this.ormIndicator.pingCheck('mysql')]);
  }
}
