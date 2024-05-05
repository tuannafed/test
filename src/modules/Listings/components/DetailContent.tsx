import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
/* eslint-disable @next/next/no-img-element */
import {
  CalendarMonth,
  Favorite,
  FavoriteBorderOutlined,
  FlagOutlined,
  LocationOn,
  Share
} from '@mui/icons-material';
import { fToNow, formatNameTime } from 'utils';

import { isArray } from 'lodash';
import React from 'react';
import NumberFormat from 'react-number-format';
import { Carousel } from 'react-responsive-carousel';
import { ITag } from '..';
import { DetailTags } from '../components';
import { IListingDetail } from '../types';

interface IDetailListingProps {
  listing: IListingDetail;
  onToggleSave?: (listing: IListingDetail) => void;
  toggleExpandShare: () => void;
  report: () => void;
}
const placeholder = '/images/logo-with-text.png';
export const DetailContent: React.FC<IDetailListingProps> = ({
  listing,
  onToggleSave,
  report,
  toggleExpandShare
}) => {
  const toggleSave = () => {
    onToggleSave && onToggleSave(listing);
  };

  const handleshowGallery = (listing: IListingDetail) => {
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
            alt="gallery-item"
          />
        </div>
      );
    });
    if (galleries && galleries.length > 0) {
      return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <Carousel
            swipeable={true}
            axis="horizontal"
            width="100%"
            showThumbs={true}
            verticalSwipe="natural"
            emulateTouch={true}
            onClickItem={() => handleshowGallery(listing)}
            thumbWidth={100}
          >
            {listGalleryItem}
          </Carousel>
        </Box>
      );
    } else {
      // return placeholder image
      return (
        <Box
          key={`gallery-${listing._id}`}
          sx={{
            width: '100%',
            maxWidth: { xs: 'auto', sm: 350 },
            m: 'auto',
            py: 8
          }}
        >
          <img
            src="/images/logo-with-text.png"
            style={{ width: '100%', objectFit: 'contain', display: 'block' }}
            data-fancybox="gallery"
            alt="gallery-item"
          />
        </Box>
      );
    }
  };

  return (
    <Box mt={2}>
      <Grid container>
        <Grid
          item
          md={5}
          xs={12}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <GalleryList />
        </Grid>
        <Grid
          item
          md={7}
          sm={12}
          width="100%"
          sx={{
            width: {
              md: '50%',
              sm: '100%'
            }
          }}
          style={{
            width: '100%'
          }}
        >
          <Box
            sx={{
              marginLeft: {
                md: '20px',
                sm: '0px'
              }
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              justifyContent="space-between"
            >
              <Typography
                color="secondary"
                fontWeight="400"
                variant="h5"
                fontSize={{ xs: '1.2rem', sm: '1.4rem' }}
                py={2}
              >
                {listing.name}
              </Typography>
              <Box
                pl={{ xs: 0, sm: 4 }}
                display={{ xs: 'flex', sm: 'block' }}
                alignItems="flex-end"
              >
                {listing.price != 0 && (
                  <Typography
                    fontWeight="bold"
                    color="primary"
                    variant="h5"
                    fontSize={{ xs: '1.2rem', sm: '1.4rem' }}
                  >
                    <NumberFormat
                      value={listing.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </Typography>
                )}

                {listing.unit != 'USD' && listing.price != 0 && (
                  <Typography variant="caption" color="primary">
                    /{formatNameTime(listing.unit)}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Stack justifyContent="space-between" direction="row">
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                pb={{ xs: 1, sm: 0 }}
              >
                <Typography
                  variant="caption"
                  display="flex"
                  alignItems="center"
                  my={1}
                >
                  <LocationOn fontSize="small" color="primary" />
                  <span>{listing?.location?.city}</span>
                </Typography>

                <Typography
                  variant="caption"
                  display="flex"
                  alignItems="center"
                  mx={{ xs: 0, sm: 1 }}
                >
                  <CalendarMonth fontSize="small" color="primary" />
                  <span>{fToNow(listing.createdAt)}</span>
                </Typography>
              </Stack>
              <Button color="secondary" onClick={toggleSave}>
                {listing.isLike ? (
                  <Favorite fontSize="large" />
                ) : (
                  <FavoriteBorderOutlined fontSize="large" />
                )}
              </Button>
            </Stack>

            <Divider
              sx={{
                borderColor: '#47487a',
                borderBottomWidth: 'medium'
              }}
            />

            <Typography fontWeight="700" variant="h6" my={2}>
              Thông tin thêm
            </Typography>
            <Typography fontSize={{ xs: '14px', sm: '1rem' }}>
              {listing.descripton}
            </Typography>
            <Typography
              variant="caption"
              display="flex"
              alignItems="center"
              my={1}
            >
              <i>
                {' '}
                Khi liên hệ vui lòng nói rằng bạn đọc thông tin từ{' '}
                <strong>
                  {' '}
                  {process.env.NEXT_PUBLIC_SITENAME || 'AhaViet'}
                </strong>
              </i>
            </Typography>

            <Box my={2}>
              <DetailTags tags={listing.tags as Array<ITag>} />
            </Box>

            <Stack
              direction="row"
              justifyContent="center"
              mx="auto"
              px={{ xs: 0, sm: 3 }}
            >
              <Button
                sx={{ mr: 2 }}
                color="primary"
                variant="contained"
                startIcon={<FlagOutlined />}
                onClick={report}
              >
                Báo cáo
              </Button>
              <Button
                sx={{ ml: 2 }}
                color="primary"
                variant="contained"
                startIcon={<Share />}
                onClick={toggleExpandShare}
              >
                Chia sẻ
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
