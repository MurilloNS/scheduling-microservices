import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiGatewayService {
  constructor(private readonly http: HttpService) {}

  async forwardRequest(method, url, data, headers) {
    try {
      const response = await axios({
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
      if (error.response) {
        return {
          status: error.response.status,
          data: error.response.data,
        };
      }

      return {
        status: 500,
        data: {
          message: 'Internal gateway error',
          error: error.message,
        },
      };
    }
  }
}
