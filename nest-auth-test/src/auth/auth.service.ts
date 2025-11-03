import { UserService } from 'src/user/user.service';
import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.getUser(userDto.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const encryptedPassword = await bcrypt.hash(userDto.password, 10);

    try {
      const user = await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      });

      user.password = '';
      return user;
    } catch (error) {
      throw new HttpException(`Failed to create user ${error}`, 500);
    }
  }
}
