import { Test, TestingModule } from '@nestjs/testing';
import { userMock } from '@src/auth/tests/mocks/auth.service.mock';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UsersServiceMock } from './mocks/users.controller.mocks';

describe('AuthService', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: UsersServiceMock,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should return one user by email', async () => {
    expect(await usersController.findOne(userMock.email)).toEqual(userMock);
  });

  it('should return all users', async () => {
    expect(await usersController.findAll()).toEqual([userMock]);
  });
});
