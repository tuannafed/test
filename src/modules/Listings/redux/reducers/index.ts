import { IListing, IListingState } from '../../types';

import { PayloadAction } from '@reduxjs/toolkit';
import { set } from 'lodash';

export const defaultState: IListingState = {
  filter: {} as any,
  listings: [],
  createForm: {
    step: 0,
    data: {} as IListing
  },
  tabState: 'all',
  focusCategory: ''
};

const reducers = {
  setListings: (state: IListingState, action: PayloadAction<any>) => {
    set(state, 'listings', action.payload);
  },
  // setCurrentUser: (state: IAuthState, action: any) => {
  //   set(state, 'currentUser', action.payload);
  // }
  setFilter: (state: IListingState, action: PayloadAction<any>) => {
    set(state, 'filter', action.payload);
  },

  setStep: (state: IListingState, action: PayloadAction<number>) => {
    set(state, 'createForm.step', action.payload);
  },

  setCreateForm: (state: IListingState, action: PayloadAction<any>) => {
    set(state, 'createForm.data', action.payload);
  },

  setTabState: (state: IListingState, action: PayloadAction<any>) => {
    set(state, 'tabState', action.payload);
  },

  setFocusCategory: (state: IListingState, action: PayloadAction<any>) => {
    set(state, 'focusCategory', action.payload);
  }
};

export default reducers;
