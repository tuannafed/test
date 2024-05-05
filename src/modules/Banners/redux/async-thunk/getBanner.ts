import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';

//import { IListingFilter } from '../../types';
import { BANNER_ACTION } from '../../constants';

export const getBanners = createAsyncThunk<any, any, ThunkAPIConfig>(
  BANNER_ACTION.GET_BANNER,
  async (args, thunkAPI) => {
    const { bannerService } = get(thunkAPI, 'extra') as APIMapping;
    const response = await bannerService.getAllBanner();
    return response.data;
  }
);

export const getBannersBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(getBanners.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(getBanners.fulfilled, (state: any, action: any) => {
    const { payload } = action;
    set(state, 'loading', 'idle');
    set(state, 'entities', payload.data);
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(getBanners.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error);
    set(state, 'currentRequestId', undefined);
  });
};
