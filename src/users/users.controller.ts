import { Controller, Get } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get()
  async findOne(email: string): Promise<User> {
    return this.usersService.findOne(email);
  }
}
