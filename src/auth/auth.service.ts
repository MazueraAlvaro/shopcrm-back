import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    let user;
    user = await this.usersService.findOne(email);
    if (!user && email.search('temporal') != -1) {
      user = await this.usersService.create({
        email,
        name: 'temporal',
        password: pass,
        temp: true,
      });
    }
    if (user && (await bcrypt.compare(pass, user.password))) {
      return { email: user.email, _id: user._id };
    }
    return null;
  }

  async login(user: Partial<User>) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
