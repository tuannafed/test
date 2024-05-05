import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const { actions, reducer } = createSlice({
  name: 'dashboard',
  initialState: {},
  reducers,
  extraReducers: builder => {
    // builder.addCase(actions.fetchDashboardData.fulfilled, (state, action) => {
  }
});

const extraActions = {
  ...actions
};

export * from './select-hooks';
export { extraActions as actionsDashboard, reducer };
