import { plainToInstance } from 'class-transformer';
import { EnvironmentVariables } from 'src/common/validators/environment.variables';
import { basicConfig } from './basic.config';
import { healthCheckConfig } from './health-check.config';
import { graphQLConfig } from './graphql.config';

export const getConfig = () => {
  const configEnvs = plainToInstance(EnvironmentVariables, process.env, {
    enableImplicitConversion: true,
  });

  return {
    basicConfig: basicConfig(configEnvs),
    healthCheckConfig: healthCheckConfig(configEnvs),
    graphQLConfig: graphQLConfig(configEnvs),
  };
};
