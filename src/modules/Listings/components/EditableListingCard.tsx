import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Menu,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
/* eslint-disable @next/next/no-img-element */
import {
  CalendarMonth,
  Favorite,
  FavoriteBorderOutlined,
  KeyboardArrowDown,
  LocationOn
} from '@mui/icons-material';
import React, { Fragment } from 'react';
import { fCurrency, fToNow } from 'utils';

import { isArray } from 'lodash';
import { IListing } from 'modules/Listings';
import { Carousel } from 'react-responsive-carousel';
import { ManageTabType } from '../types';

declare global {
  interface Window {
    Fancybox: any;
  }
}
interface ListingCardProps {
  listing: IListing;
  key: string;
  variant: ManageTabType;
  onDelete: (listing: IListing) => void;
  onHiding: (listing: IListing) => void;
  onEditing: (listing: IListing) => void;
  onRenew: (listing: IListing, value: string) => void;
}

const MENU_RECURRING = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' }
];
const placeholder = '/images/logo-with-text.png';

export const EditableListingCard: React.FC<ListingCardProps> = ({
  listing,
  key,
  variant,
  onDelete,
  onHiding,
  onEditing,
  onRenew
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const currentPath = window.location.pathname;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleshowGallery = (listing: IListing) => {
    const galleries = listing.galleries || [];
    if (isArray(galleries)) {
      const images = galleries.map(gallery => ({
        src: gallery?.image || placeholder,
        type: 'image'
      }));

      window?.Fancybox.show(images);
    }
  };

  const GalleryList = () => {
    const galleries = listing.galleries || [];
    const listGalleryItem = galleries.map((gallery, index) => {
      return (
        <div key={`gallery-${listing._id}}-${index}`}>
          <img
            height={350}
            width="80"
            data-fancybox="gallery"
            data-src="https://lipsum.app/id/2/800x600"
            src={gallery.image}
            style={{ width: '100%', objectFit: 'contain' }}
            alt={listing.name}
          />
        </div>
      );
    });

    if (galleries && galleries.length > 0) {
      return (
        <Carousel
          swipeable={true}
          axis="horizontal"
          width="100%"
          showThumbs={false}
          verticalSwipe="natural"
          emulateTouch={true}
          centerSlidePercentage={80}
          onClickItem={() => handleshowGallery(listing)}
        >
          {listGalleryItem}
        </Carousel>
      );
    } else {
      // return placeholder image
      return (
        <div key={`gallery-${listing._id}`} style={{ width: '100%' }}>
          {/* <img
              src={placeholder}
              height={350} 
              style={{width: '100%', objectFit: 'contain'}} 
              data-fancybox="gallery"
          /> */}
        </div>
      );
    }
  };

  return (
    <Card
      key={key}
      sx={{
        my: '16px',
        ':hover': {
          cursor: 'pointer'
        }
      }}
    >
      <CardContent>
        <Stack direction="row">
          <Box width="70%">
            <a
              target="_blank"
              href={`/listings/${(listing.subcategory as any)?.slug}/${
                listing.slug
              }`}
              style={{ textDecoration: 'none' }}
              rel="noreferrer"
            >
              <Typography color="secondary" fontWeight={600}>
                {listing.name}
              </Typography>
            </a>
            <Stack direction="row">
              <Typography display="flex" alignItems="center" my={1}>
                <LocationOn color="primary" />
                <span>{listing.location?.city}</span>
              </Typography>

              <Typography display="flex" alignItems="center" mx={1}>
                <CalendarMonth color="primary" />
                <span>{fToNow(listing.createdAt)}</span>
              </Typography>
            </Stack>
          </Box>

          <Box
            alignSelf="stretch"
            justifyContent="space-between"
            display="flex"
            flexDirection="column"
            ml="auto"
            pb={1}
            textAlign="right"
          >
            <Typography fontWeight="bold" color="primary">
              {' '}
              {fCurrency(listing.price)} {listing.unit}
            </Typography>
            {listing.isLike ? (
              <Favorite sx={{ ml: 'auto' }} color="secondary" />
            ) : (
              <FavoriteBorderOutlined sx={{ ml: 'auto' }} color="secondary" />
            )}
          </Box>
        </Stack>
        <Box>
          <GalleryList />
        </Box>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Stack direction="row">
          <Button
            variant="contained"
            sx={{ mx: '10px' }}
            onClick={() => onDelete(listing)}
          >
            {' '}
            Xoá{' '}
          </Button>
          <Button
            variant="contained"
            sx={{ mx: '10px' }}
            onClick={() => onHiding(listing)}
          >
            {listing.hidden ? 'Hiện' : 'Tạm ẩn'}{' '}
          </Button>

          {variant == 'expired' && [
            <Fragment key={variant}>
              <Button
                variant="contained"
                sx={{ mx: '10px' }}
                endIcon={<KeyboardArrowDown />}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Làm mới
              </Button>
              ,
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                  width: '200px'
                }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                {MENU_RECURRING.map((recurring, index) => {
                  return (
                    <MenuItem
                      key={`recurring-${index}`}
                      onClick={() => {
                        handleClose();
                        onRenew(listing, recurring.value);
                      }}
                    >
                      {recurring.label}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Fragment>
          ]}

          <Button
            variant="contained"
            sx={{ mx: '10px' }}
            onClick={() => onEditing(listing)}
          >
            {' '}
            Sửa{' '}
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

EditableListingCard.defaultProps = {
  listing: {
    name: 'Product',
    slug: 'product',
    price: 0,
    unit: 'hour',
    createdAt: '2022-04-18T13:21:20.891Z',
    isLike: false,
    galleries: [],
    _id: ''
  }
};
