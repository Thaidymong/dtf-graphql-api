import { HttpStatus, Injectable } from '@nestjs/common';
import { ActivityLogRepository } from './repositories/activity-log.repository';
import { CreateActivityLogDto } from './dto/create-activity-log.input';
import { ActivityLogResponse } from './dto/activity-log.response';
import { GraphQLError } from 'graphql';
import { ERRORSTATUSCODE, ERROR_MESSAGES } from 'src/common/errors';

@Injectable()
export class ActivityLogService {
  constructor(private readonly activityLogRepository: ActivityLogRepository) {}

  async logActivity(input: CreateActivityLogDto): Promise<ActivityLogResponse> {
    try {
      const data = await this.activityLogRepository.save(input);
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data,
      };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      } else {
        throw new GraphQLError(ERROR_MESSAGES.BAD_REQUEST, {
          extensions: {
            code: ERRORSTATUSCODE.BAD_REQUEST,
          },
        });
      }
    }
  }
}
