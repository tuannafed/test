import { apiService } from 'common/services';
import { LISTING_API } from '../constants';

export class ListingService {
  /**
   * register
   * @param data
   * @returns
   */
  register(requestBody) {
    return apiService.post(LISTING_API.GET_LISTINGS, requestBody);
  }

  /**
   * register
   * @param data
   * @returns
   */
  getListings(requestBody) {
    return apiService.get(LISTING_API.GET_LISTINGS, { params: requestBody });
  }

  /**
   * register
   * @param data
   * @returns
   */
  getTagsByCategory(id, requestBody) {
    const URL = LISTING_API.GET_TAGS_BY_CATEGORY + '/' + id;
    return apiService.get(URL, requestBody);
  }

  /**
   * register
   * @param data
   * @returns
   */
  getDetailListing(id: string, userId: any) {
    const URL = LISTING_API.GET_LISTINGS + '/' + id;
    if (userId) {
      return apiService.get(URL, { params: { userId } });
    } else {
      return apiService.get(URL);
    }
  }
  getDetailBySlug(slug) {
    const URL = LISTING_API.GET_LISTINGS + '/slug/' + slug;
    return apiService.get(URL);
  }

  saveListing(id, headers, requestBody) {
    const URL = LISTING_API.SAVE_LISTING + '/' + id;
    return apiService.post(URL, requestBody, headers);
  }

  unsaveListing(id, headers, requestBody) {
    const URL = LISTING_API.UNSAVE_LISTING + '/' + id;
    return apiService.post(URL, requestBody, headers);
  }

  reportListing(id, headers) {
    const URL = LISTING_API.REPORT_LISTING + '/' + id;
    return apiService.post(URL, {}, headers);
  }

  deleteListing(id, headers) {
    const URL = LISTING_API.GET_LISTINGS + '/' + id;
    return apiService.delete(URL, { headers });
  }

  editListing(id, requestBody, headers) {
    const URL = LISTING_API.GET_LISTINGS + '/' + id;
    return apiService.put(URL, requestBody, { headers });
  }

  createListing(requestBody, headers) {
    const URL = LISTING_API.GET_LISTINGS;
    return apiService.post(URL, requestBody, {
      headers
    });
  }

  getSavedListing(headers) {
    const URL = LISTING_API.SAVE_LISTING;
    return apiService.get(URL, { headers });
  }
  import(requestBody, headers) {
    const URL = LISTING_API.IMPORT_LISTINGS;
    return apiService.post(URL, requestBody, {
      headers
    });
  }
}

export const listingService = new ListingService();
