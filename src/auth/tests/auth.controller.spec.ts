import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthServiceMock } from './mocks/auth.controller.mock';
import {
  JWTModuleMock,
  UsersModuleMock,
  userMock,
} from './mocks/auth.service.mock';

describe('AuthService', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModuleMock, JWTModuleMock],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: AuthServiceMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return JWT on login', async () => {
    const req = { user: { email: userMock.email, _id: userMock._id } };
    expect(await authController.login(req)).toHaveProperty('access_token');
  });

  it('should return the user on getProfile', async () => {
    const user = { email: userMock.email, _id: userMock._id };
    const req = { user };
    expect(await authController.getProfile(req)).toEqual(user);
  });
});
