import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';
import { CATEGORY_ACTION } from '../../constants';

export const getCategories = createAsyncThunk<any, any, ThunkAPIConfig>(
  CATEGORY_ACTION.GET_CATEGORY,
  async (args, thunkAPI) => {
    const { categoryService } = get(thunkAPI, 'extra') as APIMapping;
    const response = await categoryService.getCategories();

    return response.data;
  }
);

export const getCategoriesBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(getCategories.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });

  builder.addCase(getCategories.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });

  builder.addCase(getCategories.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
