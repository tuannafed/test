import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  getCurrentUserBuilder,
  login,
  loginBuilder,
  register,
  registerBuilder
} from './async-thunk';
import reducers, { defaultState } from './reducers';

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: { ...defaultState },
  reducers,
  extraReducers: builder => {
    loginBuilder(builder);
    getCurrentUserBuilder(builder);
    registerBuilder(builder);
  }
});

const extraActions = {
  ...actions,
  login,
  register,
  loginBuilder,
  getCurrentUser
};

export * from './select-hooks';
export { extraActions as actionsAuth, reducer };
