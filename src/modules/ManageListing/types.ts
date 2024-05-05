/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface ILoginForm {
  email: string;
  type: string;
  password?: string;
  token?: string;
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
