import { TOKEN, SAVED_LISTINGS, USER_LOCATIONS, DISTANCE } from './constants';
import { localStorageCache } from './handle';

// - Token ------------------------------------------------
export const getToken = () => localStorageCache.retrieve(TOKEN);
export const removeToken = () => localStorageCache.remove(TOKEN);
export const setToken = (value: string) =>
  localStorageCache.store(TOKEN, value);
export const getSavedListing = () => localStorageCache.retrieve(SAVED_LISTINGS);
export const setSavedListing = (value: string) =>
  localStorageCache.store(SAVED_LISTINGS, value);
export const setUserLocation = (value: object) =>
  localStorageCache.store(USER_LOCATIONS, value);
export const getUserLocation = () => localStorageCache.retrieve(USER_LOCATIONS);
export const setDistance = (value: number) =>
  localStorageCache.store(DISTANCE, value);
export const getDistance = () => localStorageCache.retrieve(DISTANCE);
