import { Controller, Get } from '@nestjs/common';
// import { CatsService } from './cats.service';
// import { CreateCatDto } from './dto/create-cat.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
