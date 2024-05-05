import { set } from 'lodash';
import { IAuthState } from '../../types';

export const defaultState: IAuthState = {
  currentUser: {},
  loading: 'idle',
  currentRequestId: undefined,
  signUpStep: 0,
  error: null,
  isOpenLocationPicker: false
};

const reducers = {
  clearState: (state: IAuthState) => {
    set(state, 'currentUser', {});
  },
  setStep: (state: IAuthState, action: any) => {
    set(state, 'signUpStep', action.payload);
  },

  toggleLocationPicker: (state: IAuthState) => {
    set(state, 'isOpenLocationPicker', !state.isOpenLocationPicker);
  },
  setCurrentUser: (state: IAuthState, action: any) => {
    set(state, 'currentUser', action.payload);
  }
};

export default reducers;
