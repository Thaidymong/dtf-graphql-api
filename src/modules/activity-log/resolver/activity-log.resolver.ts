import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ActivityLogResponse } from '../dto/activity-log.response';
import { CreateActivityLogDto } from '../dto/create-activity-log.input';
import { ActivityLogService } from '../activity-log.service';

@Resolver()
export class ActivityLogResolver {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Mutation(() => ActivityLogResponse)
  async logActivityMutation(@Args('input') input: CreateActivityLogDto): Promise<ActivityLogResponse> {
    return await this.activityLogService.logActivity(input);
  }
}
