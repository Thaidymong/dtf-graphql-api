import { SetMetadata } from '@nestjs/common';

export const LogActivity = (activityType: string, action: string) =>
  SetMetadata('activityType', activityType) && SetMetadata('action', action);
