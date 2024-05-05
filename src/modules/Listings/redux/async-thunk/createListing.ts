import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';
import { LISTING_ACTION } from '../../constants';

export const createtListing = createAsyncThunk<any, any, ThunkAPIConfig>(
  LISTING_ACTION.CREATE_LISTING,
  async (args, thunkAPI) => {
    const { token, body } = args;
    const { listingService } = get(thunkAPI, 'extra') as APIMapping;
    const response = await listingService.createListing(body, {
      Authorization: `Bearer ${token}`,
      'Content-Type':
        'multipart/form-data; boundary=--------------------------151840689896304164188529'
    });
    return response.data;
  }
);

export const createListingBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(createtListing.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(createtListing.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(createtListing.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
