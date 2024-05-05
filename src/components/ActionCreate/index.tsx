import { redirect, stackCallback } from 'utils';

import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { actionsListing } from 'modules/Listings';
import React from 'react';
import { useDispatch } from 'react-redux';

export const ActionCreate: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Fab
      color="secondary"
      aria-label="add"
      className="fixed-bottom"
      onClick={() => {
        dispatch(actionsListing.setStep(0 as any));
        stackCallback(() => redirect('/listings/create'));
      }}
    >
      <Add />
    </Fab>
  );
};
