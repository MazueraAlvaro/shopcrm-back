import { userMock } from '@src/auth/tests/mocks/auth.service.mock';

export const UsersServiceMock = {
  findOne: (email: string) => {
    if (email === userMock.email) {
      return userMock;
    }
  },
  findAll: () => [userMock],
};
