import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'node_modules/rxjs/dist/types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAutGuard implements CanActivate {
  constructor(private jwtService: JwtService, private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer: string = authHeader.split(' ')[0];
      const token: string = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            message: 'Пользователь не авторизован',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const user = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });
      console.log(user);
      req.user = user;
      return true;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Пользователь не авторизован',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
