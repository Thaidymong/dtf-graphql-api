import { Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { LOGGER_CONTEXT, SHUTDOWN_MESSAGE, BOOTSTRAP_MESSAGE } from './constants';
import { getConfig } from 'src/configs/base/get-config';

@Injectable()
export class AppService implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger = new Logger(LOGGER_CONTEXT);

  onApplicationBootstrap() {
    const { port, host } = getConfig().basicConfig.expressConfig;

    this.logger.log(BOOTSTRAP_MESSAGE(host, port));
  }

  onApplicationShutdown() {
    this.logger.log(SHUTDOWN_MESSAGE);

    process.exit(0);
  }
}
