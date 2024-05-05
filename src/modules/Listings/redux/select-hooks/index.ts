import { RootState } from 'common/redux';
import { useSelector } from 'react-redux';
import { IListingState } from 'modules/Listings';
import { createSelector } from '@reduxjs/toolkit';

const listingSelector = createSelector(
  (state: RootState) => state.listing,
  (data: IListingState) => {
    const { filter, listings, focusCategory } = data;
    return {
      listings,
      focusCategory,
      filter
    };
  }
);

export const useSelectListings = () => {
  return useSelector<RootState, any>(listingSelector);
};

const filterListingSelector = createSelector(
  (state: RootState) => state.listing,
  (data: IListingState) => {
    const { filter } = data;
    return {
      ...filter
    };
  }
);

export const useSelectFilterListing = () => {
  return useSelector<RootState, any>(filterListingSelector);
};

const createListingSelector = createSelector(
  (state: RootState) => state.listing,
  (data: IListingState) => {
    const { createForm } = data;
    return {
      ...createForm
    };
  }
);

export const useSelectCreateListing = () => {
  return useSelector<RootState, any>(createListingSelector);
};

const manageListingSelector = createSelector(
  (state: RootState) => state.listing,
  (data: IListingState) => {
    const { tabState } = data;
    return {
      tabState
    };
  }
);

export const useSelectManageListing = () => {
  return useSelector<RootState, any>(manageListingSelector);
};
