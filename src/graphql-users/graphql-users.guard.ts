import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'node_modules/rxjs/dist/types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAutGuard implements CanActivate {
  constructor(private jwtService: JwtService, private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    try {
      const authHeader: string = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new Error('Пользователь не авторизован');
      }
      const user = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });
      req.user = user;
      return true;
    } catch (e) {
      console.log(e);
      throw { message: e.message };
    }
  }
}
