/* eslint-disable prefer-destructuring */

import { NodeEnv } from '../enums/node-env.enum';

export const NODE_ENV = process.env.NODE_ENV as NodeEnv;
