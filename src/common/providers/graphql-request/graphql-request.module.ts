import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GraphQLRequestService } from './graphql-request.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.getOrThrow<number>('HTTP_TIMEOUT'),
        maxRedirects: configService.getOrThrow<number>('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GraphQLRequestService],
  exports: [GraphQLRequestService, HttpModule],
})
export class GraphQLRequestModule {}
