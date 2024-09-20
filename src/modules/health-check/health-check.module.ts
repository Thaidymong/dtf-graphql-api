import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './health-check.controller';
import { HttpModule } from '@nestjs/axios';
import { PingIndicator } from './indicator/ping.indicator';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
  providers: [PingIndicator],
})
export class HealthCheckModule {}
