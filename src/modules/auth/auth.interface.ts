export interface JwtPayload {
  token: string;
  userId: number;
  iat?: string;
  exp?: string;
}
