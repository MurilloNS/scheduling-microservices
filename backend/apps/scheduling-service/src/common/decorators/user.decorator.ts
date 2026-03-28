import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

type UserFromHeader = {
  userId: string;
  roles: string[];
};

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserFromHeader => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const userId = request.headers['x-user-id'] as string | undefined;
    const rolesHeader = request.headers['x-user-roles'] as string | undefined;

    return {
      userId: userId ?? '',
      roles: rolesHeader ? rolesHeader.split(',') : [],
    };
  },
);
