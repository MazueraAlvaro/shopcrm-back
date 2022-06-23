import { User } from '@src/users/schemas/user.schema';
import { userMock } from './auth.service.mock';

export const AuthServiceMock = {
  login: (user: Partial<User>) => {
    if (user.email === userMock.email) {
      return { access_token: 'sdfsfsdf' };
    }
  },
};
