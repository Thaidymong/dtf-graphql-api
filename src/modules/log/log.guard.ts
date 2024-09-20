import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { LogService } from './log.service';
import { Reflector } from '@nestjs/core';
import { ILogHeaders, LOGS_KEY } from './log.decorator';

@Injectable()
export class LogGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly logService: LogService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const meta = this.reflector.get<ILogHeaders>(LOGS_KEY, context.getHandler());

    this.logService.log({
      entity: meta.entity,
      action: meta.action,
      info: {
        user_id: req?.user?.id,
        user_role: req?.user?.role,
        created_at: new Date(),
        device: req?.headers['user-agent'],
        os: req?.headers['os'],
        ip: req?.ip,
        query: req?.body?.query,
        mutation: req?.body?.mutation,
        variables: req?.body?.variables,
      },
    });

    return true;
  }
}
