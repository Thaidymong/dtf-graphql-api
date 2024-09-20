import { Injectable, Logger } from '@nestjs/common';
import { EntitiesEnum } from 'src/common/enums/entities.enum';

export interface ILog {
  entity: EntitiesEnum;
  action: string;
  info: any;
}

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);
  constructor() {}

  log(message: ILog) {
    this.logger.log(`${message.entity}.${message.action}`, message.info);
  }
}
