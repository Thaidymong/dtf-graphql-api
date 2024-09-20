import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GraphQLError } from 'graphql';
import { DecoratorsName } from 'src/common/decorators';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { ERRORSTATUSCODE, ERROR_MESSAGES } from 'src/common/errors';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../auth.interface';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request: Request;
    const isPublic = this.reflector.getAllAndOverride<boolean>(DecoratorsName.Public, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    } else {
      request = this.getRequest(context);
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new GraphQLError(ERROR_MESSAGES.NO_JWT_TOKEN, {
        extensions: {
          code: ERRORSTATUSCODE.UNAUTHENTICATED,
        },
      });
    }

    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      })) as JwtPayload;

      const user = await this.authService.getUserByOfficerId(payload.userId);

      if (!user) {
        throw new GraphQLError(ERROR_MESSAGES.UNAUTHENTICATED, {
          extensions: {
            code: ERRORSTATUSCODE.UNAUTHENTICATED,
          },
        });
      }

      return true;
    } catch (error) {
      throw new GraphQLError('Authentication Error', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
