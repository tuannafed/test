import { ReactNode } from 'react';
export interface IBannerProps {
  children?: ReactNode;
}
export interface IBannerState {
  entities: IBanner[];
  banner: IBanner;
  userForm: {
    isShow: boolean;
    isAdd: boolean;
  };
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: any;
}

export interface IBanner {
  _id?: string;
  isActive?: boolean;
  link?: string;
  place_image?: {
    _id?: string;
    listing?: string;
    image?: string;
  };
}
