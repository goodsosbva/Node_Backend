import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: any, user: any) => void) {
    done(null, user.email);
  }

  async deserializeUser(payload: any, done: (err: any, user: any) => void) {
    const user = await this.userService.getUser(payload);

    if (!user) {
      done(new Error('No User'), null);
      return;
    }
    const { password, ...userInfo } = user;
    done(null, userInfo);
  }
}
