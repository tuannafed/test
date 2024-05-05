import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'common/redux';
import { IAuthState } from 'modules/Auth';
import { useSelector } from 'react-redux';

const authSelector = createSelector(
  (state: RootState) => state.auth,
  (data: IAuthState) => {
    const { currentUser, error, loading } = data;
    return {
      currentUser,
      error,
      loading
    };
  }
);

export const useSelectAuthStore = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useSelector<RootState, any>(authSelector);
};
