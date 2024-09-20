import { HttpMethods } from 'src/common/enums';
import { EnvironmentVariables } from 'src/common/validators/environment.variables';

export const basicConfig = (configEnvs: EnvironmentVariables) => ({
  expressConfig: {
    port: configEnvs.API_PORT,
    host: configEnvs.API_HOST,
  },
  corsConfig: {
    origin: configEnvs.CORS_ALLOWED_ORIGINS,
    methods: [HttpMethods.PUT, HttpMethods.GET, HttpMethods.PATCH, HttpMethods.POST, HttpMethods.OPTIONS],
  },
  throttlerConfig: {
    ttlS: configEnvs.THROTTLER_TTL_S,
    limit: configEnvs.THROTTLER_LIMIT,
  },
  apiConfig: {
    api_version: configEnvs.API_VERSION,
  },
  bodyParserConfig: {
    limit: configEnvs.MAX_FILE_SIZE_KB,
  },
  uploadFileConfig: {
    max_file_size: configEnvs.MAX_FILE_SIZE,
    max_files: configEnvs.MAX_FILE_COUNT,
  },
});
