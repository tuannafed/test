import { apiService } from 'common/services';
import { AUTH_API } from '../constants';

class AuthService {
  /**
   * register
   * @param data
   * @returns
   */
  register(requestBody) {
    return apiService.post(AUTH_API.REGISTER, requestBody);
  }
}

export const authService = new AuthService();
