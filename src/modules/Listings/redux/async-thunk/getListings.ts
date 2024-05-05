import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';

import { IListingFilter } from '../../types';
import { LISTING_ACTION } from '../../constants';

export const getListings = createAsyncThunk<
  any,
  IListingFilter,
  ThunkAPIConfig
>(LISTING_ACTION.GET_LISTING, async (args, thunkAPI) => {
  const { listingService } = get(thunkAPI, 'extra') as APIMapping;
  const response = await listingService.getListings(args);
  return response.data;
});

export const getListingsBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(getListings.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(getListings.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(getListings.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
