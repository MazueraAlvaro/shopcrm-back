import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {
  JWTModuleMock,
  userMock,
  UsersModuleMock,
} from './mocks/auth.service.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModuleMock, JWTModuleMock],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should return the payload found user', async () => {
    expect(await authService.validateUser(userMock.email, '123456')).toEqual({
      email: userMock.email,
      _id: userMock._id,
    });
  });

  it('should return the null for user not found (non-temporal)', async () => {
    expect(await authService.validateUser('a@a.com', '123456')).toBeNull();
  });

  it('should return the payload found user (temporal)', async () => {
    expect(await authService.validateUser('a@temporal.com', '123456')).toEqual({
      email: 'a@temporal.com',
      _id: userMock._id,
    });
  });

  it('should return the JWT', async () => {
    expect(
      await authService.login({ email: userMock.email, _id: userMock._id }),
    ).toHaveProperty('access_token');
  });
});
