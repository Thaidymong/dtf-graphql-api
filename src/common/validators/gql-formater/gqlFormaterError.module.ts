import { Module, UnprocessableEntityException, type ValidationError, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import _ from 'lodash';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useFactory() {
        return new ValidationPipe({
          transform: true,
          exceptionFactory: (errors: ValidationError[]) => new UnprocessableEntityException(_.map(errors, 'constraints')),
        });
      },
    },
  ],
})
export class ValidationModule {}
