import { Injectable, Logger } from '@nestjs/common';
import { AwardRepository } from '../repositories';
import { GraphQLError } from 'graphql';
import { ERROR_MESSAGES, ERRORSTATUSCODE } from '~/common/errors';

@Injectable()
export class AwardService {
  private readonly logger = new Logger(AwardService.name);
  constructor(private readonly awardRepository: AwardRepository) {}

  async findAllAwardsByCategory(name: string) {
    try {
      return await this.awardRepository.findAwardsByCategory(name);
    } catch (error) {
      this.logger.error(error);
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
