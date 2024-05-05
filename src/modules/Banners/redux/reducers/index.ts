import { set } from 'lodash';
import { IBannerState } from '../../types';

export const defaultState: IBannerState = {
  entities: [],
  banner: {},
  userForm: {
    isShow: false,
    isAdd: true
  },
  loading: 'idle',
  currentRequestId: undefined,
  error: null
};

const reducers = {
  clearState: (state: IBannerState) => {
    set(state, 'entities', []);
    set(state, 'banner', {});
    set(state, 'userForm', {
      isShow: false,
      isAdd: true
    });
  }
};

export default reducers;
