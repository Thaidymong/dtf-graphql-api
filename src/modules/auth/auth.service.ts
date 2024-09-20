import { Injectable, Param } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { ERRORSTATUSCODE, ERROR_MESSAGES } from 'src/common/errors';
import { UserEnity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByOfficerId(@Param('id') id: number): Promise<UserEnity> {
    try {
      const foundUser = await this.userRepository.findOneBy({ hr_employee_id: id });
      if (!foundUser) {
        throw new GraphQLError(ERROR_MESSAGES.NOT_FOUND, {
          extensions: {
            code: ERRORSTATUSCODE.NOT_FOUND,
          },
        });
      }

      return foundUser;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw new GraphQLError(error?.message, {
          extensions: {
            code: error?.extensions?.code,
          },
        });
      } else {
        throw new GraphQLError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
          extensions: {
            code: ERRORSTATUSCODE.INTERNAL_SERVER_ERROR,
          },
        });
      }
    }
  }
}
