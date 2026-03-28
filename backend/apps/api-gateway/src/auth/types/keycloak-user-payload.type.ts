export interface KeycloakUserPayload {
  username: string;
  email: string;
  enabled: boolean;
  emailVerified: boolean;
  credentials: {
    type: string;
    value: string;
    temporary: boolean;
  }[];
  firstName?: string;
  lastName?: string;
}
