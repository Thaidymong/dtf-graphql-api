import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { envValidation } from 'src/common/validators/env-validation';
import { getConfig } from 'src/configs/base/get-config';
import { AppService } from './app.service';
import { HealthCheckModule } from './modules/health-check';
import { GqlThrottlerGuard } from 'src/common/guards';
import { ExampleModule } from './modules/example';
import { GqlModule } from './modules/graphql/graphql.module';
import { HttpErrorFilter } from 'src/common/filters/http-error.filter';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { ActivityLogModule } from './modules/activity-log/activity-log.module';
import { UserModule } from './modules/user/user.module';
import { GraphQLRequestModule } from './common/providers/graphql-request/graphql-request.module';
import { MySQLModule } from './common/providers/databases/mysql/mysql.module';
import { FileUploadModule } from './modules/upload/file-upload.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { LogModule } from './modules/log/log.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggerModule } from './modules/logger/logger.module';
import { ApplicationFormModule } from './modules/application-form/application-form.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidation,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    MySQLModule,
    GraphQLRequestModule,
    GqlModule,
    ThrottlerModule.forRoot({
      errorMessage: 'You have exceed the request limit, please try again later.',
      throttlers: [
        {
          ttl: seconds(getConfig().basicConfig.throttlerConfig.ttlS),
          limit: getConfig().basicConfig.throttlerConfig.limit,
        },
      ],
    }),
    HealthCheckModule,
    ExampleModule,
    ActivityLogModule,
    UserModule,
    FileUploadModule,
    AuthModule,
    LogModule,
    LoggerModule,
    ApplicationFormModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
