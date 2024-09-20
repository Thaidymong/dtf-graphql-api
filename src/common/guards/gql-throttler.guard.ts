import { ExecutionContext, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGenerateKeyFunction, ThrottlerGetTrackerFunction, ThrottlerGuard, ThrottlerOptions } from '@nestjs/throttler';
import { ThrottlerLimitDetail } from '@nestjs/throttler/dist/throttler.guard.interface';

import { THROTTLER_EXCEPTION_MESSAGES } from '../decorators/throttler.decorator';
import { GraphQLError } from 'graphql';
import { ERRORSTATUSCODE } from '../errors';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  protected keyToName = new Map<string, string>();
  private readonly logger = new Logger(GqlThrottlerGuard.name);

  getRequestResponse(execContext: ExecutionContext) {
    const context = GqlExecutionContext.create(execContext);
    const { req, res } = context.getContext();

    return { req: req, res: res };
  }

  protected async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
    throttler: ThrottlerOptions,
    getTracker: ThrottlerGetTrackerFunction,
    generateKey: ThrottlerGenerateKeyFunction,
  ): Promise<boolean> {
    const { req } = this.getRequestResponse(context);
    const tracker = await getTracker(req);
    const key = generateKey(context, tracker, throttler.name);
    this.keyToName.set(key, throttler.name);

    this.logger.log(`request_key: ${key}`);
    return super.handleRequest(context, limit, ttl, throttler, getTracker, generateKey);
  }

  protected async throwThrottlingException(
    execContext: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    const context = GqlExecutionContext.create(execContext);

    const throttlerName = this.keyToName.get(throttlerLimitDetail.key);

    const exceptionMessage = this.reflector.get<any>(THROTTLER_EXCEPTION_MESSAGES, context.getHandler())?.[throttlerName];

    if (exceptionMessage) {
      if (typeof exceptionMessage === 'function') {
        throw new GraphQLError(
          exceptionMessage({
            limit: throttlerLimitDetail.limit,
            ttl: throttlerLimitDetail.ttl,
            timeToExpire: throttlerLimitDetail.timeToExpire,
            totalHits: throttlerLimitDetail.totalHits,
          }),
          {
            extensions: {
              code: ERRORSTATUSCODE.TOO_MANY_REQUESTS,
              http: { status: HttpStatus.TOO_MANY_REQUESTS },
            },
          },
        );
      } else {
        throw new GraphQLError(exceptionMessage, {
          extensions: {
            code: ERRORSTATUSCODE.TOO_MANY_REQUESTS,
            http: { status: HttpStatus.TOO_MANY_REQUESTS },
          },
        });
      }
    } else {
      throw new GraphQLError(await this.getErrorMessage(execContext, throttlerLimitDetail), {
        extensions: {
          code: ERRORSTATUSCODE.TOO_MANY_REQUESTS,
          http: { status: HttpStatus.TOO_MANY_REQUESTS },
        },
      });
    }
  }
}
