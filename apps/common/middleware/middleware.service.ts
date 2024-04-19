import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ERROR_MESSAGES, STATUSCODE } from 'apps/utils/message';
import { errorResponses } from 'apps/utils/response';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any) {
    if (!req.headers.authorization) {
      const errorRes = {
        message: ERROR_MESSAGES.UNAUTHORIZED_USER,
      };
      return await errorResponses(errorRes, STATUSCODE.unauthorized);
    }

    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');

    if (bearerToken.length !== 2 || bearerToken[0] !== 'Bearer') {
      const errorRes = {
        message: ERROR_MESSAGES.UNAUTHORIZED_USER,
      };
      return await errorResponses(errorRes, STATUSCODE.unauthorized);
    }

    const token = bearerToken[1];

    try {
      const decoded = await verify(token, 'JWT_SECRET_KEY');
      req.user = decoded;
    } catch (error) {
      const errorRes = {
        message: ERROR_MESSAGES.errorLog,
      };
      return await errorResponses(errorRes, STATUSCODE.badRequest);
    }
  }
}