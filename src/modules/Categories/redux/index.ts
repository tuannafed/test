import { createSlice } from '@reduxjs/toolkit';
import { getCategories, getCategoriesBuilder } from './async-thunk';
import reducers, { defaultState } from './reducers';

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: { ...defaultState },
  reducers,
  extraReducers: builder => {
    getCategoriesBuilder(builder);
  }
});

const extraActions = {
  ...actions,
  getCategories
};

export * from './select-hooks';
export { extraActions as actionsCategory, reducer };
