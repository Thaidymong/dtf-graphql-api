import { getConfig } from 'src/configs/base/get-config';

export const LOGGER_CONTEXT = 'NestApplication';
const { api_version } = getConfig().basicConfig.apiConfig;

export const BOOTSTRAP_MESSAGE = (host: string, port: number) =>
  `Nest application is listening on - http://${host}:${port}/api/${api_version}/graphql`;

export const SHUTDOWN_MESSAGE = 'Nest application successfully stopped';
