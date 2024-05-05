import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';

import { BANNER_ACTION } from '../../constants';

export const deleteBanners = createAsyncThunk<any, any, ThunkAPIConfig>(
  BANNER_ACTION.DELETE_BANNER,
  async (args, thunkAPI) => {
    const { token, id } = args;
    const { bannerService } = get(thunkAPI, 'extra') as APIMapping;
    const response = await bannerService.deleteBanner(id, {
      Authorization: `Bearer ${token}`
    });
    return response.data;
  }
);

export const deleteBannersBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(deleteBanners.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(deleteBanners.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(deleteBanners.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
