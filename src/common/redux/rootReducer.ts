import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import { reducer as app } from 'modules/App';
import { reducer as auth } from 'modules/Auth';
import { reducer as user } from 'modules/Users';
import { reducer as category } from 'modules/Categories';
import { reducer as listing } from 'modules/Listings';

export const reducerMappingList = {
  app,
  auth,
  user,
  category,
  listing
  // dashboard,
};

const rootReducer = combineReducers(reducerMappingList);
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
