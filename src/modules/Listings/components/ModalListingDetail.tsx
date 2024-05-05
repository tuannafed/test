import { Collapse, Grid } from '@mui/material';
import { showConfirm, showSuccess } from 'common/swalAlert';
import { EnhanceModal, SocialShare } from 'components';
import React, { useEffect, useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { getToken } from 'common/localStorage';
import { authService } from 'modules/Auth';
import { IUser } from 'modules/Users';
import { useSnackbar } from 'notistack';
import { actionsListing } from '../redux';
import { listingService } from '../services';
import { IListingDetail } from '../types';
import { DetailContent } from './DetailContent';

interface ModalListingDetailProps {
  title?: string;
  open?: boolean;
  listing: IListingDetail;
  onCancel: () => void;
}

export const ModalListingDetail: React.FC<ModalListingDetailProps> = ({
  open = false,
  listing,
  onCancel
}) => {
  const [listingState, setListing] = useState(listing);
  const [isExpandShare, setExpandShare] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser>({});

  const token = getToken();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (token) {
      authService
        .getCurrentUser({
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setCurrentUser(res.data.data);
        });
    } else {
      getListingDetail();
    }
  }, [listing]);

  useEffect(() => {
    getListingDetail();
  }, [currentUser]);

  const getListingDetail = () => {
    listingService
      .getDetailListing(listing._id as string, currentUser._id || undefined)
      .then(listing => {
        if (listing.data.data) {
          setListing(listing.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onToggleLike = () => {
    if (currentUser._id) {
      dispatch(
        actionsListing.saveListing({
          token: token,
          id: listing._id as string,
          type: listingState.isLike ? 'unsave' : 'save'
        })
      )
        .unwrap()
        .then(data => {
          if (data) {
            getListingDetail();
          }
        });
    } else {
      enqueueSnackbar('Cần đăng nhập để sử dụng chức năng này', {
        variant: 'error'
      });
    }
  };

  const report = () => {
    if (currentUser._id) {
      showConfirm('Bạn thực sự muốn báo cáo sản phẩm / dịch vụ  này').then(
        response => {
          if (response.isConfirmed) {
            dispatch(
              actionsListing.reportListings({
                id: listing._id,
                token: token
              })
            )
              .unwrap()
              .then(data => {
                if (data.data) {
                  showSuccess('Báo cáo thành công');
                }
              });
          }
        }
      );
    } else {
      enqueueSnackbar('Cần đăng nhập để sử dụng chức năng này', {
        variant: 'error'
      });
    }
  };

  const toggleExpandShare = () => {
    setExpandShare(!isExpandShare);
  };

  const domain = process.env.NEXT_PUBLIC_URL;
  const shareLink = `${domain}/listings/${
    (listing?.subcategory as any)?.slug
  }/${listing.slug}`;
  const previewImage =
    listing.galleries && listing.galleries.length > 0
      ? listing.galleries[0].image
      : '/images/social_share_image.png';

  return (
    <EnhanceModal
      open={open}
      maxWidth="lg"
      onClose={() => onCancel()}
      onCloseIcon={() => onCancel()}
    >
      <DetailContent
        listing={listingState}
        onToggleSave={onToggleLike}
        toggleExpandShare={toggleExpandShare}
        report={report}
      />
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sm={5}></Grid>
        <Grid item xs={12} sm={7}>
          <Collapse in={isExpandShare} unmountOnExit>
            <SocialShare
              link={shareLink}
              media={previewImage}
              urlCopy={shareLink}
            />
          </Collapse>
        </Grid>
      </Grid>
    </EnhanceModal>
  );
};
