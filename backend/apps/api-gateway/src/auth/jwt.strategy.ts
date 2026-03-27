import { ExtractJwt, Strategy, SecretOrKeyProvider } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { JwtPayload } from './types/jwt-payload.type';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwksSecret = jwksRsa.passportJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri:
        'http://localhost:8080/realms/scheduling-platform/protocol/openid-connect/certs',
    }) as unknown;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      issuer: 'http://localhost:8080/realms/scheduling-platform',

      audience: 'api-gateway',

      algorithms: ['RS256'],

      secretOrKeyProvider: jwksSecret as SecretOrKeyProvider,
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.realm_access?.roles || [],
    };
  }
}
