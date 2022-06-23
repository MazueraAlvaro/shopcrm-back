import { userMock } from '@src/auth/tests/mocks/auth.service.mock';

export const UserModelMock = {
  find: jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue([userMock]) }),
  findOne: jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(userMock) }),
  create: jest.fn().mockResolvedValue(userMock),
};
