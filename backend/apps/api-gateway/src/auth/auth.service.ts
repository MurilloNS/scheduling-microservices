import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { RegisterDto } from './dto/register.dto';
import { KeycloakTokenResponse } from './types/keycloak-token-response.type';
import { KeycloakUserPayload } from './types/keycloak-user-payload.type';

@Injectable()
export class AuthService {
  async getAdminToken(): Promise<string> {
    try {
      const response = await axios.post<KeycloakTokenResponse>(
        'http://localhost:8080/realms/master/protocol/openid-connect/token',
        new URLSearchParams({
          client_id: 'admin-cli',
          grant_type: 'password',
          username: 'admin',
          password: 'admin',
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      return response.data.access_token;
    } catch {
      throw new InternalServerErrorException('Erro ao obter token do Keycloak');
    }
  }

  async register(data: RegisterDto) {
    const token = await this.getAdminToken();

    const userPayload: KeycloakUserPayload = {
      username: data.username,
      email: data.email,
      enabled: true,
      emailVerified: true,
      credentials: [
        {
          type: 'password',
          value: data.password,
          temporary: false,
        },
      ],
    };

    if (data.firstName) {
      userPayload.firstName = data.firstName;
    }

    if (data.lastName) {
      userPayload.lastName = data.lastName;
    }

    try {
      const createResponse = await axios.post(
        'http://localhost:8080/admin/realms/scheduling-platform/users',
        userPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const location = createResponse.headers.location as string;
      const userId = location?.split('/').pop() as string;

      await axios.put(
        `http://localhost:8080/admin/realms/scheduling-platform/users/${userId}/reset-password`,
        {
          type: 'password',
          value: data.password,
          temporary: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return {
        message: 'Usuário criado com sucesso',
        userId,
      };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new InternalServerErrorException(
          err.response?.data || 'Erro ao criar usuário',
        );
      }

      throw new InternalServerErrorException('Erro inesperado');
    }
  }
}
