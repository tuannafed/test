import { Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Masonry } from '@mui/lab';
import { listingService } from 'common/api';
import { useAppDispatch } from 'common/hooks';
import { getToken } from 'common/localStorage';
import { Loading } from 'components';
import { useSelectFilterListing } from 'modules/Listings';
import InfiniteScroll from 'react-infinite-scroller';
import { actionsListing } from '../redux';
import { IListing } from '../types';
import { ListingCard } from './ListingCard';

export const ListingList: React.FC<{
  notFilter?: boolean;
  maxListing?: number;
}> = ({ notFilter = false, maxListing = 20 }) => {
  const filter = useSelectFilterListing();
  const childRef = useRef<HTMLDivElement>(null);
  const [localListing, setLocalListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();

  const [paggination, setPaggination] = useState<{
    current?: number;
    limit?: number;
    total?: number;
  }>({
    current: 1,
    limit: 20
  });

  const fetchData = useCallback(filter => {
    setLoading(true);
    listingService
      .getListings(filter)
      .then((listings: any) => {
        if (notFilter) {
          setLocalListing(listings.data.data);
        } else {
          setLocalListing(localListing =>
            listings.data.pagination.page === 1 &&
            listings.data.data?.length < 1
              ? []
              : localListing.concat(listings.data.data)
          );
        }

        setPaggination({
          current: listings.data.pagination.page,
          limit: listings.data.pagination.limit,
          total: listings.data.pagination.total
        });
        setTotal(listings.data.pagination.total);
      })
      .then(() => {
        const timeoutId = setTimeout(() => {
          clearTimeout(timeoutId);
          childRef.current?.classList.remove('load-more');
          setLoading(false);
        }, 300);
      })
      .catch(error => {
        const timeoutId = setTimeout(() => {
          clearTimeout(timeoutId);
          childRef.current?.classList.remove('load-more');
          setLoading(false);
        }, 300);
      });
  }, []);

  const getListings = (filter: any) => {
    setLocalListing([]);
    fetchData({
      ...filter,
      'pagination[current]': 1,
      'pagination[limit]': maxListing
    });
  };

  const onPageChange = useCallback(
    pageNumber => {
      if (notFilter) {
        fetchData({
          orderdesc: true,
          'pagination[current]': pageNumber,
          'pagination[limit]': maxListing
        });
      } else {
        fetchData({
          ...filter,
          'pagination[current]': pageNumber,
          'pagination[limit]': maxListing
        });
      }
    },
    [filter, notFilter, maxListing, fetchData]
  );

  const loadMore = useCallback(
    entries => {
      if (notFilter) return;
      if (!total) return;
      if (loading) return;
      if (localListing && localListing.length >= total) return;

      onPageChange(paggination?.current ? paggination?.current + 1 : 1);
    },
    [localListing, onPageChange, paggination, total, notFilter, loading]
  );

  useEffect(() => {
    if (notFilter) {
      getListings({
        orderdesc: true,
        'pagination[current]': 1,
        'pagination[limit]': 10
      });

      return;
    }

    getListings(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const onSaveListing = (listing: IListing) => {
    dispatch(
      actionsListing.saveListing({
        id: listing._id as string,
        token: getToken(),
        type: listing.isLike ? 'unsave' : 'save'
      })
    )
      .unwrap()
      .then(res => {
        getListings(filter);
      })
      .catch(err => {
        // console.log(err);
      });
  };

  return (
    <div ref={childRef} className="wapper-masonry">
      {localListing?.length > 0 ? (
        <InfiniteScroll
          pageStart={1}
          loadMore={loadMore}
          hasMore={!loading}
          loader={<></>}
        >
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3 }}
            spacing={4}
            className="my-masonry-grid"
          >
            {localListing?.map((listing, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  className="my-masonry-item"
                >
                  <ListingCard
                    key={`listing_${index}`}
                    listing={listing}
                    size="small"
                    onToggleSave={onSaveListing}
                  />
                </Grid>
              );
            })}
          </Masonry>
        </InfiniteScroll>
      ) : (
        <Typography
          color="secondary"
          fontWeight={600}
          sx={{ display: loading ? 'none' : 'block' }}
        >
          Không tìm thấy rao vặt nào trong phạm vi tìm kiếm
        </Typography>
      )}
      {loading && <Loading open={loading} className="loading" />}
    </div>
  );
};
