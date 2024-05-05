import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';
import { IListingFilter } from '../../types';
import { listingService } from '../../services';
import { LISTING_ACTION } from '../../constants';

export const reportListings = createAsyncThunk<any, any, ThunkAPIConfig>(
  LISTING_ACTION.REPORT_LISTING,
  async (args, thunkAPI) => {
    const { id, token } = args;
    const response = await listingService.reportListing(id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

export const reportListingBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(reportListings.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(reportListings.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(reportListings.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
