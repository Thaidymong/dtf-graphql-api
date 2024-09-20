import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogRepository } from './repositories/activity-log.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLogEntity } from './entities/activity-log.entity';
import { ActivityLogResolver } from './resolver/activity-log.resolver';
import { GraphQLRequestService } from 'src/common/providers/graphql-request/graphql-request.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityLogEntity]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.getOrThrow<number>('HTTP_TIMEOUT'),
        maxRedirects: configService.getOrThrow<number>('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ActivityLogService, ActivityLogRepository, ActivityLogResolver, GraphQLRequestService],
})
export class ActivityLogModule {}
