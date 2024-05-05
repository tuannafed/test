import { apiService } from 'common/services';
import { CATEGORY_API } from '../constants';
import { ISubCategory } from '../types';

class CategoryService {
  /**
   * register
   * @param data
   * @returns
   */
  register(requestBody) {
    return apiService.post(CATEGORY_API.GET_CATEGORY, requestBody);
  }

  /**
   *
   * @param requestBody
   * @returns
   *
   * */
  getCategories() {
    return apiService.get(CATEGORY_API.GET_CATEGORY);
  }

  getSubCategories(id) {
    const URL = CATEGORY_API.GET_CATEGORY + '/' + id;
    return apiService.get(URL);
  }
  getSubCategoryBySlug(slug) {
    const URL = CATEGORY_API.FIND_SLUG;
    return apiService.get(URL, { params: { slug: slug } });
  }

  getLocation(data, headers) {
    const URL = `${CATEGORY_API.GOOGLE_MAP}?lat=${data.lat}&lng=${data.lng}`;
    return apiService.get(URL, { headers });
  }
}

export const categoryService = new CategoryService();
