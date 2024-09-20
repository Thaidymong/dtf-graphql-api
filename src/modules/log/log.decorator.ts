import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { LogGuard } from './log.guard';
import { EntitiesEnum } from 'src/common/enums/entities.enum';
import { ActionsEnum } from 'src/common/enums/actions.enum';

export interface ILogHeaders {
  entity: EntitiesEnum;
  action: ActionsEnum;
}

export const LOGS_KEY = 'logs';

export const Log = (args: ILogHeaders) => {
  return applyDecorators(SetMetadata(LOGS_KEY, args), UseGuards(LogGuard));
};
