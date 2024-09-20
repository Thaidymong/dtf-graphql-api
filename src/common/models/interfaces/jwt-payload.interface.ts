import { UserRole } from '~/common/enums/user.enum';
import { JwtPayload as _JwtPayload } from 'jsonwebtoken';

export interface JwtPayload extends _JwtPayload {
  id: string;
  username: string;
  role: UserRole;
}
