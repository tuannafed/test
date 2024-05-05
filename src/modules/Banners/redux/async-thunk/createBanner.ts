import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';
import { BANNER_ACTION } from '../../constants';

export const createBanner = createAsyncThunk<any, any, ThunkAPIConfig>(
  BANNER_ACTION.CREATE_BANNER,
  async (args, thunkAPI) => {
    const { token, body } = args;
    // console.log("PHUOC DATA", token)
    const { bannerService } = get(thunkAPI, 'extra') as APIMapping;
    const response = await bannerService.create(body, {
      Authorization: `Bearer ${token}`,
      'Content-Type':
        'multipart/form-data; boundary=--------------------------151840689896304164188529'
    });
    return response.data;
  }
);

export const createBannerBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(createBanner.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'currentRequestId', null);
    set(state, 'currentRequestId', requestId);
  });

  builder.addCase(createBanner.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });

  builder.addCase(createBanner.rejected, (state: any, action) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error);
    set(state, 'currentRequestId', undefined);
  });
};
