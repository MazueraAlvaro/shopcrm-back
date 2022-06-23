import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashSync } from 'bcrypt';
import { Types } from 'mongoose';
import { UsersService } from '../../../users/users.service';

export const userMock = {
  _id: new Types.ObjectId(),
  email: 'alvaro@edlegion.com',
  password: hashSync('123456', 10),
  name: 'Alvaro Mazuera',
  temp: false,
};

@Module({
  providers: [
    {
      provide: JwtService,
      useValue: {
        sign: jest
          .fn()
          .mockResolvedValue(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsdmFyb0B0ZW1wb3JhbC5jb20iLCJzdWIiOiI2MmIzNmMyMzJhOTA2M2RlMTZkYWY3YzkiLCJpYXQiOjE2NTU5MjU4MDksImV4cCI6MTY1NTkyOTQwOX0.kvKx2FnLZfCEPR4ezzBy7InstT7rkUogskoHkGBQu9k',
          ),
      },
    },
  ],
  exports: [JwtService],
})
export class JWTModuleMock {}

@Module({
  providers: [
    {
      provide: UsersService,
      useValue: {
        findOne: (email) => (email === userMock.email ? userMock : null),
        create: (user) =>
          Promise.resolve({
            ...user,
            password: hashSync(user.password, 10),
            _id: userMock._id,
          }),
      },
    },
  ],
  exports: [UsersService],
})
export class UsersModuleMock {}
