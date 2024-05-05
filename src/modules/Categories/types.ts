import { IUser } from 'modules/Users';

export interface IAuthProps {
  children: React.ReactNode;
}

export interface IAuthState {
  currentUser: IUser;
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: any;
  signUpStep: number;
  isOpenLocationPicker: boolean;
}

export interface IRegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  distance: number;
  signup_from: string;
  passwordConfirm: string;
}

export type Location = {
  lat: number;
  lng: number;
};

export interface ISubCategory {
  _id: string;
  parrent: string;
  name: string;
  slug: string;
  available_tags: string[];
}

export interface ICategory {
  _id: string;
  name: string;
  place_image?: string;
  slug: string;
  note: string;
  sub_categories: ISubCategory[];
}
