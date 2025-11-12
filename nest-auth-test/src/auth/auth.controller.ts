import {
  Controller,
  Body,
  Post,
  Get,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import {
  AuthenticatedGuard,
  GoogleAuthGuard,
  LocalAuthGuard,
  LoginGuard,
} from './auth.guard';

interface RequestWithUser extends ExpressRequest {
  user?: any;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ) {
    const email = (req.body as { email: string }).email;
    const password = (req.body as { password: string }).password;
    const userInfo = await this.authService.validateUser(email, password);

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    return res.send({ message: 'Login successful' });
  }

  @UseGuards(LoginGuard)
  @Post('login2')
  login2(
    @Request() req: RequestWithUser,
    @Response() res: ExpressResponse,
  ): void {
    const cookies = req.cookies as
      | { [key: string]: string | undefined }
      | undefined;
    if (!cookies?.['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 60,
      });
    }
    res.send({ message: 'Login2 successful' });
  }

  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return 'if you have logged in, you will see this message.';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login3')
  login3(@Request() req: RequestWithUser) {
    return req.user as User;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test-guard2')
  testGuard2WithSession(@Request() req: RequestWithUser) {
    return req.user as User;
  }

  @Get('to-google')
  @UseGuards(GoogleAuthGuard)
  googleAuth(@Request() req) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }
}
