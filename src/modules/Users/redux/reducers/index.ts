import { PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '../../types';
// import { PayloadAction } from '@reduxjs/toolkit';
import { set } from 'lodash';

export const defaultState: IUserState = {
  entities: [],
  user: {},
  userForm: {
    isShow: false,
    isAdd: true
  },
  loading: 'idle',
  currentRequestId: undefined,
  error: null
};

const reducers = {
  clearState: (state: IUserState) => {
    set(state, 'entities', []);
    set(state, 'user', {});
    set(state, 'userForm', {
      isShow: false,
      isAdd: true
    });
  },
  updateQuizActions: (
    state: IUserState,
    action: PayloadAction<{
      isShow: boolean;
      isAdd: boolean;
    }>
  ) => {
    const { payload } = action;
    set(state, 'userForm', { ...state.userForm, ...payload });
  }
};

export default reducers;
