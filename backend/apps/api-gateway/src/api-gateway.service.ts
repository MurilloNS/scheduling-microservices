import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class ApiGatewayService {
  constructor(private readonly http: HttpService) {}

  async forwardRequest(
    method: string,
    url: string,
    data: unknown,
    headers: Record<string, string | string[] | undefined>,
  ): Promise<{ status: number; data: unknown }> {
    try {
      const response: AxiosResponse = await axios({
        method,
        url,
        data,
        headers,
      });

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        return {
          status: err.response.status,
          data: err.response.data,
        };
      }

      return {
        status: 500,
        data: {
          message: 'Internal gateway error',
          error: err.message,
        },
      };
    }
  }
}
