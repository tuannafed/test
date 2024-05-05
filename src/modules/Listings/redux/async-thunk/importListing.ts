import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';
import { LISTING_ACTION } from '../../constants';

export const importListing = createAsyncThunk<any, any, ThunkAPIConfig>(
  LISTING_ACTION.IMPORT_LISTINGS,
  async (args, thunkAPI) => {
    const { token, body } = args;
    const { listingService } = get(thunkAPI, 'extra') as APIMapping;
    const response = await listingService.import(body, {
      Authorization: `Bearer ${token}`,
      'Content-Type':
        'multipart/form-data; boundary=--------------------------151840689896304164188529'
    });
    return response.data;
  }
);

export const importListingBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(importListing.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(importListing.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(importListing.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
