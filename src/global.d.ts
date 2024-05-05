import { RootState } from 'common';
import { Dispatch } from 'redux';

import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';

declare global {
  type ThunkAPIConfig = {
    dispath: Dispatch;
    rejectValue: {
      errorMessage: string;
    };
    state: RootState;
    extra: any;
  };
}

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};
