import { Request } from 'express';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { join } from 'node:path';
import { getConfig } from 'src/configs/base/get-config';
import { GraphQLFormattedError } from 'graphql';
import { errorHandler } from 'src/common/errors';

const { api_version } = getConfig().basicConfig.apiConfig;

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      cache: 'bounded',
      autoSchemaFile: join(process.cwd(), './src/schema.gql'),
      fieldResolverEnhancers: ['guards', 'interceptors', 'filters'],
      sortSchema: false,
      introspection: true,
      context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
      playground: false,
      autoTransformHttpErrors: true,
      path: `/api/${api_version}/graphql`,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      plugins: [
        getConfig().graphQLConfig.usePlayground
          ? ApolloServerPluginLandingPageLocalDefault({ footer: false })
          : ApolloServerPluginLandingPageProductionDefault({ footer: false }),
      ],
      formatError: (err: GraphQLFormattedError) => errorHandler(err),
    };
  }
}
