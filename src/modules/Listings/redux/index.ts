import { createSlice } from '@reduxjs/toolkit';
import {
  getListings,
  getListingsBuilder,
  getTagsByCategory,
  getTagsByCategoryBuilder,
  saveListing,
  saveListingBuilder,
  reportListings,
  reportListingBuilder,
  deleteListings,
  deleteListingsBuilder,
  editListings,
  editListingsBuilder,
  createtListing,
  createListingBuilder,
  importListing
} from './async-thunk';
import reducers, { defaultState } from './reducers';
import { importListingBuilder } from './async-thunk/importListing';

const { actions, reducer } = createSlice({
  name: 'listing',
  initialState: { ...defaultState },
  reducers,
  extraReducers: builder => {
    getListingsBuilder(builder);
    getTagsByCategoryBuilder(builder);
    saveListingBuilder(builder);
    reportListingBuilder(builder);
    deleteListingsBuilder(builder);
    editListingsBuilder(builder);
    createListingBuilder(builder);
    importListingBuilder(builder);
  }
});

const extraActions = {
  ...actions,
  getListings,
  getTagsByCategory,
  saveListing,
  reportListings,
  deleteListings,
  editListings,
  createtListing,
  importListing
};

export * from './select-hooks';
export { extraActions as actionsListing, reducer };
