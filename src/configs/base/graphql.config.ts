import { toBoolean } from 'src/common/utils';
import { EnvironmentVariables } from 'src/common/validators/environment.variables';

export const graphQLConfig = (configEnvs: EnvironmentVariables) => ({
  usePlayground: toBoolean(configEnvs.USE_GQL_PLAYGROUND),
});
