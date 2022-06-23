import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { userMock } from '@src/auth/tests/mocks/auth.service.mock';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UserModelMock } from './mocks/users.service.mocks';

describe('AuthService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: UserModelMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should return a user', async () => {
    expect(await usersService.findOne(userMock.email)).toEqual(userMock);
    expect(UserModelMock.findOne).toHaveBeenCalled();
  });

  it('should return all users', async () => {
    expect(await usersService.findAll()).toEqual([userMock]);
    expect(UserModelMock.find).toHaveBeenCalled();
  });

  it('should return the created user', async () => {
    const { _id, ...user } = userMock;
    expect(await usersService.create({ ...user, password: '123456' })).toEqual(
      userMock,
    );
    expect(UserModelMock.create).toHaveBeenCalled();
  });
});
