import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';
import { LISTING_ACTION } from '../../constants';

export const editListings = createAsyncThunk<any, any, ThunkAPIConfig>(
  LISTING_ACTION.EDIT_LISTING,
  async (args, thunkAPI) => {
    const { token, id, body } = args;
    const { listingService } = get(thunkAPI, 'extra') as APIMapping;
    const response = await listingService.editListing(id, body, {
      Authorization: `Bearer ${token}`
    });
    return response.data;
  }
);

export const editListingsBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(editListings.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(editListings.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(editListings.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
