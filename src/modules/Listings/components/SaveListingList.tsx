import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { listingService } from 'common/api';
import { useAppDispatch } from 'common/hooks';
import { getToken } from 'common/localStorage';
import { actionsListing } from '../redux';
import { ListingCard } from './ListingCard';

export const SaveListingList: React.FC = () => {
  const [localListing, setLocalListing] = useState([]);
  const wrapListings = localListing || [];
  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    fetchSaveListing();
  }, []);

  const fetchSaveListing = () => {
    listingService
      .getSavedListing({
        Authorization: `Bearer ${token}`
      })
      .then(listings => {
        setLocalListing(listings.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onUnSaveListing = (listing: any) => {
    dispatch(
      actionsListing.saveListing({
        id: listing._id,
        token,
        type: 'unsave'
      })
    )
      .unwrap()
      .then(response => {
        fetchSaveListing();
      })
      .catch(err => {
        // console.log(err);
      });
  };

  return (
    <Grid container>
      {wrapListings.length == 0 && (
        <Typography variant="h6" align="center" sx={{ width: '100%' }}>
          {' '}
          Không tìm thấy danh sách đã lưu{' '}
        </Typography>
      )}

      {wrapListings.map((listing, index) => (
        <Grid item md={6} p={2} key={`grid_${index}`}>
          <ListingCard
            key={`listing_${index}`}
            listing={listing}
            save={true}
            onToggleSave={onUnSaveListing}
          />
        </Grid>
      ))}
    </Grid>
  );
};
