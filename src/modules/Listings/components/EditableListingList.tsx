import { Box, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { actionsListing, useSelectFilterListing } from '../redux';

import { listingService } from 'common/api';
import { useAppDispatch } from 'common/hooks';
import { getToken } from 'common/localStorage';
import { IListing } from 'modules/Listings';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { stackCallback } from 'utils';
import { ManageTabType } from '../types';
import { EditableListingCard } from './EditableListingCard';

const DATE_DURATION = 24 * 60 * 60 * 1000;
const DATE_ADD = {
  daily: 1 * DATE_DURATION,
  weekly: 7 * DATE_DURATION,
  monthly: 30 * DATE_DURATION,
  yearly: 365 * DATE_DURATION
};

const MAX_LISTING = 20;

interface EditableListProps {
  variant: ManageTabType;
}

export const EditableListingList: React.FC<EditableListProps> = ({
  variant
}) => {
  const [listingsState, setListings] = React.useState<IListing[]>([]);
  const filterListings = useSelectFilterListing();
  const token = getToken();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [paggination, setPaggination] = useState<{
    current: number;
    limit: number;
    total: number;
  }>({
    current: 1,
    limit: 20,
    total: 0
  });

  const numberOfPage =
    paggination?.total > paggination?.limit
      ? Math.floor(paggination?.total / paggination?.limit) + 1
      : 1;

  const fetchListing = (filter: any) => {
    listingService
      .getListings(filter)
      .then(listings => {
        setListings(listings.data.data);
        setPaggination({
          current: listings.data.pagination.page,
          limit: listings.data.pagination.limit,
          total: listings.data.pagination.total
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (filterListings.create_by) {
      fetchListing({
        ...filterListings,
        'pagination[current]': paggination.current,
        'pagination[limit]': MAX_LISTING
      });
    }
  }, [filterListings]);

  const handleListingDelete = (listing: IListing) => {
    dispatch(
      actionsListing.deleteListings({
        id: listing._id,
        token
      })
    )
      .unwrap()
      .then(() => {
        enqueueSnackbar(`Listing ${listing.name} deleted`, {
          variant: 'success'
        });
        fetchListing(filterListings);
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  const handleListingHiding = (listing: IListing) => {
    dispatch(
      actionsListing.editListings({
        id: listing._id,
        body: {
          hidden: !listing.hidden
        },
        token
      })
    )
      .unwrap()
      .then(() => {
        enqueueSnackbar(`Listing edit successfully`, { variant: 'success' });
        fetchListing(filterListings);
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  const handleListingEdit = (listing: IListing) => {
    dispatch(
      actionsListing.setCreateForm({
        step: 0,
        data: listing
      })
    );

    stackCallback(() => {
      router.push({
        pathname: `/listings/edit`
      });
    }, 500);
  };

  const handleRenew = (listing: IListing, value) => {
    const ADD_DURATION = Date.now() + DATE_ADD[value];

    dispatch(
      actionsListing.editListings({
        id: listing._id,
        body: {
          expire_at: new Date(ADD_DURATION)
        },
        token
      })
    )
      .unwrap()
      .then(() => {
        enqueueSnackbar(`Listing edit successfully`, { variant: 'success' });
        fetchListing(filterListings);
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };
  const onPageChange = (event, pageNumber) => {
    // router.push({
    //   pathname: window.location.pathname,
    //   query: {
    //     page: pageNumber
    //   }
    // }, undefined, {shallow: true})

    fetchListing({
      ...filterListings,
      'pagination[current]': pageNumber,
      'pagination[limit]': MAX_LISTING
    });
  };

  return (
    <div>
      {listingsState.map((listing, index) => (
        <EditableListingCard
          listing={listing}
          key={`manage_list_${listing._id}`}
          variant={variant}
          onDelete={handleListingDelete}
          onHiding={handleListingHiding}
          onEditing={handleListingEdit}
          onRenew={handleRenew}
        />
      ))}
      <Box justifyContent="center" display="flex" width="100%" mt={3}>
        {numberOfPage > 1 && (
          <Pagination
            count={numberOfPage}
            page={paggination.current}
            sx={{ margin: '0 auto' }}
            onChange={onPageChange}
          />
        )}
      </Box>
    </div>
  );
};

EditableListingList.defaultProps = {
  variant: 'all'
};
