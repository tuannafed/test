import { apiService } from 'common/services';
import { BANNER_API } from '../constants';

class BannerService {
  create(requestBody, headers) {
    return apiService.post(BANNER_API.CREATE_BANNER, requestBody, { headers });
  }

  getAllBanner() {
    return apiService.get(BANNER_API.GETALL_BANNER);
  }

  deleteBanner(id, headers) {
    const URL = BANNER_API.DELETE_BANNER + '/' + id;
    return apiService.delete(URL, { headers });
  }
}

export const bannerService = new BannerService();
