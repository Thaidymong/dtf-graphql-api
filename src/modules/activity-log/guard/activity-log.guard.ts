import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ActivityLogService } from '../activity-log.service';

@Injectable()
export class ActivityLogGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    // Retrieve the user and other relevant information
    const user = request.user;
    const ipAddress = request.ip;

    // Extract custom metadata (activity type and action)
    const activityType = this.reflector.get<string>('activityType', context.getHandler());
    const action = this.reflector.get<string>('action', context.getHandler());

    await this.activityLogService.logActivity({
      user_id: user.id,
      activity_type: activityType,
      action,
      ip_address: ipAddress,
      description: null,
    });

    return true;
  }
}
