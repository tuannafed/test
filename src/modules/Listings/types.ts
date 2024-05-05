import { IUser } from 'modules/Users';

export interface IAuthProps {
  children: React.ReactNode;
}

export interface IListingState {
  filter: IListingFilter;
  listings: Array<IListing>;
  createForm: {
    step: number;
    data: IListing;
  };
  tabState: ManageTabType;
  focusCategory: string;
}

export type ManageTabType = 'all' | 'expired' | 'hidden';

export interface IListingFilter {
  location?: {
    type: string;
    coordinates: number[];
  };
  distance?: number;
  subcategory?: string;
  name?: string;
  tags?: string[];
  userId?: string;
  hidden?: boolean;
  expired?: boolean;
  pagination: {
    current: number;
    limit: number;
  };
}

export type Location = {
  type: String;
  coordinates: number[];
  city?: string;
};

export interface ListingGalleries {
  lising: IListing;
  image: string;
}

export interface IListing {
  _id?: string;
  name?: string;
  slug?: string;
  descripton?: string;
  type?: string;
  subcategory?: string;
  price?: number;
  recursion?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  hidden?: boolean;
  unit?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'USD';
  location?: Location;
  galleries?: ListingGalleries[];
  isLike?: boolean;
  create_by?: IUser;
  createdAt?: string;
  updatedAt?: string;
}

export interface IListingDetail {
  _id?: string;
  name?: string;
  slug?: string;
  descripton?: string;
  type?: string;
  subcategory?: string;
  price?: number;
  recursion?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  tags?: Array<ITag>;
  hidden?: boolean;
  unit?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'USD';
  location?: Location;
  galleries?: ListingGalleries[];
  isLike?: boolean;
  create_by?: IUser;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITag {
  _id: string;
  tag_name: string;
  createAt: string;
  updatedAt: string;
}

export interface SaveParams {
  id: string;
  token: string;
  type: 'save' | 'unsave';
}

export interface ICreateListingForm {
  name?: string;
  slug?: string;
  descripton?: string;
  type?: string;
  category: string;
  subcategory?: string;
  price?: number;
  tags?: Array<any>;
  recursion?: string;
  unit?: string;
  images?: Array<any>;
  galleries?: ListingGalleries[];
  location?: Location;
}

export interface ICreateListingFormStep1 {
  name: string;
  images: Array<any>;
}

export interface ICreateListingFormStep2 {
  category: string;
  subcategory: string;
  price: number;
  unit: string;
  descripton: string;
  has_price: boolean;
}

export interface ICreateListingFormStep3 {
  recursion: string;
}
