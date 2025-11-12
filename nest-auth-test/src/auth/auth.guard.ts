import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser extends ExpressRequest {
  user?: any;
}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const cookies = request.cookies as
      | { [key: string]: string | undefined }
      | undefined;
    if (cookies?.['login']) {
      return true;
    }

    const body = request.body as { email?: string; password?: string };
    if (!body.email || !body.password) {
      return false;
    }

    const email = body.email;
    const password = body.password;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const result = (await super.canActivate(context)) as boolean;

    if (result && request.user) {
      await super.logIn(request);
    }

    return result;
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user as TUser;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequest & { isAuthenticated(): boolean }>();
    return request.isAuthenticated();
  }
}

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    return result;
  }
}
