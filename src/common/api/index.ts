import { appService } from 'modules/App';
import { authService } from 'modules/Auth';
import { listingService } from 'modules/Listings';
import { userService } from 'modules/Users';
import { categoryService } from 'modules/Categories';
import { bannerService } from 'modules/Banners';

export const apiMapping = {
  authService,
  userService,
  listingService,
  appService,
  categoryService,
  bannerService
};
export { listingService, categoryService, authService, bannerService };

export type APIMapping = typeof apiMapping;
