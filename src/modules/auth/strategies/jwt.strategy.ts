import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../auth.interface';
import { UserEnity } from 'src/modules/user/entities/user.entity';
import { GraphQLError } from 'graphql';
import { ERRORSTATUSCODE, ERROR_MESSAGES } from 'src/common/errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEnity> {
    try {
      const user = await this.authService.getUserByOfficerId(payload.userId);
      if (!user) {
        throw new GraphQLError(ERROR_MESSAGES.UNAUTHENTICATED, {
          extensions: {
            code: ERRORSTATUSCODE.UNAUTHENTICATED,
          },
        });
      }
      return user;
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
