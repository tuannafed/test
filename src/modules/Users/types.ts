import { ReactNode } from 'react';

export interface IUserProps {
  children?: ReactNode;
}
export interface IUserState {
  entities: IUser[];
  user: IUser;
  userForm: {
    isShow: boolean;
    isAdd: boolean;
  };
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: any;
}
export interface IUser {
  _id?: string | number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  location?: {
    type?: string;
    coordinates?: number[];
    zipcode: string;
    city: string;
  };
  distance?: number;
  signup_from?: string;
  google?: Object;
  facebook?: Object;
  updatedAt?: string;
  createdAt?: string;
}

export enum Role {
  ADMIN = 'admin', // 0
  USER = 'user' // 1
}
