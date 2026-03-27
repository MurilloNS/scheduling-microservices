import { All, Controller, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import type { RequestWithUser } from './common/interfaces/request-with-user.interface';
import { ApiGatewayService } from './api-gateway.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class ApiGatewayController {
  constructor(private readonly service: ApiGatewayService) {}

  @All()
  async root(@Req() req: RequestWithUser, @Res() res: Response) {
    return this.handle(req, res);
  }

  @All('*path')
  async proxy(@Req() req: RequestWithUser, @Res() res: Response) {
    return this.handle(req, res);
  }

  private async handle(req: RequestWithUser, res: Response) {
    const user = req.user;

    const targetUrl = `http://localhost:3001${req.url}`;

    const {
      host: _host,
      'content-length': contentLength,
      connection,
      'accept-encoding': acceptEncoding,
      ...headers
    } = req.headers;

    const response = await this.service.forwardRequest(
      req.method,
      targetUrl,
      req.body,
      {
        ...headers,
        'x-user-id': user.userId,
        'x-user-roles': user.roles?.join(',') || '',
      },
    );

    return res
      .status(response.status ?? 500)
      .send(response.data ?? { message: 'Unknown error' });
  }
}
