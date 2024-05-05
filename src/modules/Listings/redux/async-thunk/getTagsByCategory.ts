import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';
import { LISTING_ACTION } from '../../constants';
import { listingService } from '../../services';

export const getTagsByCategory = createAsyncThunk<any, any, ThunkAPIConfig>(
  LISTING_ACTION.GET_TAGS_BY_CATEGORY,
  async (args, thunkAPI) => {
    const { id, body } = args;
    const response = await listingService.getTagsByCategory(id, body);
    return response.data;
  }
);

export const getTagsByCategoryBuilder = (
  builder: ActionReducerMapBuilder<any>
) => {
  builder.addCase(getTagsByCategory.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(getTagsByCategory.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(getTagsByCategory.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
