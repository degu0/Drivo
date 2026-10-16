import { Request } from 'express';

export type JwtPayload = {
  sub: string;
};

export type AuthenticatedUser = {
  id: string;
};

export type AuthenticatedRequest = Request & {
  user: AuthenticatedUser;
};
