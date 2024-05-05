import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { set } from 'lodash';
import { LISTING_ACTION } from '../../constants';
import { listingService } from '../../services';
import { SaveParams } from '../../types';

export const saveListing = createAsyncThunk<any, SaveParams, ThunkAPIConfig>(
  LISTING_ACTION.SAVE_LISTING,
  async (args, thunkAPI) => {
    const { id, token, type } = args;
    switch (type) {
      case 'save': {
        const response = await listingService.saveListing(
          id,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          },
          {}
        );
        return response.data;
      }
      default: {
        const response = await listingService.unsaveListing(
          id,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          },
          {}
        );
        return response.data;
      }
    }
  }
);

export const saveListingBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(saveListing.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(saveListing.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(saveListing.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
