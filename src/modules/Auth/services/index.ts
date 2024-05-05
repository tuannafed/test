import { apiService } from 'common/services';
import { AUTH_API } from '../constants';

class AuthService {
  /**
   * login
   * @param requestBody
   */
  login(requestBody) {
    return apiService.post(AUTH_API.LOGIN, requestBody);
  }

  /**
   * getCurrentUser
   * @param requestBody
   * @returns
   */
  getCurrentUser(requestBody) {
    return apiService.get(AUTH_API.ME, requestBody);
  }

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
