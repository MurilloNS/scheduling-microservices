export type JwtPayload = {
  sub: string;
  email: string;
  realm_access?: {
    roles: string[];
  };
};
