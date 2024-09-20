import { EnvironmentVariables } from 'src/common/validators/environment.variables';

export const healthCheckConfig = (configEnvs: EnvironmentVariables) => ({
  build: configEnvs.SERVICE_VERSION,
});
