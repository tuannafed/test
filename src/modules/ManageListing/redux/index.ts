import { createSlice } from '@reduxjs/toolkit';
import { register, registerBuilder } from './async-thunk';
import reducers, { defaultState } from './reducers';

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: { ...defaultState },
  reducers,
  extraReducers: builder => {
    registerBuilder(builder);
  }
});

const extraActions = {
  ...actions,
  register
};

export * from './select-hooks';
export { extraActions as actionsAuth, reducer };
