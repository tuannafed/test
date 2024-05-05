import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';

import { LISTING_ACTION } from '../../constants';

export const deleteListings = createAsyncThunk<any, any, ThunkAPIConfig>(
  LISTING_ACTION.DELETE_LISTING,
  async (args, thunkAPI) => {
    const { token, id } = args;
    const { listingService } = get(thunkAPI, 'extra') as APIMapping;
    const response = await listingService.deleteListing(id, {
      Authorization: `Bearer ${token}`
    });
    return response.data;
  }
);

export const deleteListingsBuilder = (
  builder: ActionReducerMapBuilder<any>
) => {
  builder.addCase(deleteListings.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(deleteListings.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(deleteListings.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
