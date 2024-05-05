import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
/* eslint-disable @next/next/no-img-element */
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import React, { Fragment, useState } from 'react';
import { fToNow, formatNameTime } from 'utils';

import { isArray } from 'lodash';
import { IListing } from 'modules/Listings';
import NumberFormat from 'react-number-format';
import { Carousel } from 'react-responsive-carousel';
import { ModalListingDetail } from './ModalListingDetail';

interface ListingCardProps {
  listing: IListing;
  key: string;
  save?: boolean;
  size?: 'small' | 'large';
  onToggleSave?: (listing: IListing) => void;
}
// const placeholder = "https://www.northernlightspizza.com/wp-content/uploads/2017/01/image-placeholder.jpg";
const placeholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXh6vH////5+vrl7fPv8/f0+fzt9Pbf6vD+/f/j6/Lf6vL///3f6fLr8fbv8/by9vm0HxD7AAACbUlEQVR4nO3c65abIBRAYVHTDALx/d+2VBuDII6zLHro2t/fmEn2HETn2jQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADkG29irNHa4I9G9+qu83B2BTauu01JIIYUUUkghhbcX/ipFTGH3LKOTUmi6Qq/QGQrLovA8Ckuj8LzqC/98A2ZX5YXd2Lajf6beOaTmwm5+tnnsBNZc+NTt/OaNanWT/U5hzYWjWjzyh1VSqK1ONpTPW/fyz66kcHCqixJtHwSqPvvUKgq1D/Rjik61MZzhWPd5aJ3fTfwR6yn+P4XzBFU8RevCwvzPJCoo9IFmepdmPUUdFuqaZzgt0fcUw8T+88Ar/wrSC/UywemgcKE+7Tg/ZNRY8V2bDScYT9G6r+mdu+fOK8guXE8wmaK/Vet6980PPmUXDvEEVXLRCL942lwGkguny0RSmF76//ILuh/SE1JyYXIObk/xzfn17NJH5BZ+LvSHpmjno10yRbmFySYTDHFjivONnZ9iHC+3MLNE31NcJy7zNsn9m9DC9DIRTXG9UD977jTF1UIVWpjbZDJTDM/YeLsRWfjdBKMprj8d8RRFFm5d6Dca31OM99z1diOwMHehT01TTBe0WV00BBYem+AyRbdxcDhFgYX6YN80RZu5LTCSZ9gcLzSqz+xIZvloAgt/MsN8u+QZUkghhRRSSCGFFFJIIYWXFKqv85Towr3fcDpKSy78xygsjcLzKCyNwvPEFCpthxKsVlIKXVeGE1NYHoUUUkghhRRSeFfh2D6u0o53BOpmuOz/RA17f8MHAAAAAAAAAAAAAAAAAAAAAAAAAAAAALjcb3yLQG5tF3tgAAAAAElFTkSuQmCC';
export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  key,
  save,
  size,
  onToggleSave
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

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
            onClick={() => handleshowGallery(listing)}
            src={gallery.image}
            style={{ width: '100%', objectFit: 'contain' }}
            alt="Image Gallery"
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
                    height={size === 'small' ? `200` : `350`}
                    onClick={() => handleshowGallery(listing)}
                    style={{width: '100%', objectFit: 'contain'}} 
                    data-fancybox="gallery"
                /> */}
          <img
            src={placeholder}
            height={size === 'small' ? `344` : `350`}
            onClick={() => handleshowGallery(listing)}
            style={{ width: '100%', objectFit: 'contain' }}
            data-fancybox="gallery"
            alt="Image Gallery"
          />
        </div>
      );
    }
  };

  const setOpenModalCard = item => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Fragment key={key}>
      <Card
        sx={{
          ':hover': {
            cursor: 'pointer'
          }
        }}
      >
        <CardContent>
          <Stack direction="row">
            <Box width="70%">
              <Box
                //href={`/listings/${listing.subcategory?.slug}/${listing.slug}`}
                onClick={() => setOpenModalCard(listing)}
              >
                <Typography color="secondary" fontWeight={600}>
                  {listing.name}
                </Typography>
              </Box>
              <Stack
                direction="row"
                style={{
                  fontSize: '10px'
                }}
              >
                {listing.location?.city && (
                  <Typography
                    variant="caption"
                    display="flex"
                    alignItems="center"
                    my={1}
                  >
                    <span
                      style={{
                        fontSize: '18px',
                        color: '#47487a',
                        paddingRight: '4px',
                        marginBottom: '2px'
                      }}
                    >
                      ●
                    </span>
                    <span>{listing.location?.city}</span>
                  </Typography>
                )}

                <Typography
                  variant="caption"
                  display="flex"
                  alignItems="center"
                  mx={1}
                >
                  <span
                    style={{
                      fontSize: '18px',
                      color: '#47487a',
                      paddingRight: '4px',
                      marginBottom: '2px'
                    }}
                  >
                    ●
                  </span>
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
              {listing.price && listing.price > 0 ? (
                <Typography fontWeight="bold" color="primary">
                  <NumberFormat
                    value={listing.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </Typography>
              ) : null}

              {listing.price && listing.price > 0
                ? listing.unit != 'USD' && (
                    <Typography variant="caption" color="primary">
                      /{formatNameTime(listing.unit)}
                    </Typography>
                  )
                : null}
              {listing.isLike || save ? (
                <Favorite
                  sx={{
                    ml: 'auto',
                    ':hover': {
                      cursor: 'pointer'
                    }
                  }}
                  color="secondary"
                  fontSize={size === 'small' ? 'medium' : 'large'}
                  onClick={() => onToggleSave && onToggleSave(listing)}
                />
              ) : (
                <FavoriteBorderOutlined
                  sx={{
                    ml: 'auto',
                    ':hover': {
                      cursor: 'pointer'
                    }
                  }}
                  color="secondary"
                  fontSize={size === 'small' ? 'medium' : 'large'}
                  onClick={() => onToggleSave && onToggleSave(listing)}
                />
              )}
            </Box>
          </Stack>
          <Box>
            {listing?.galleries?.length && listing?.galleries?.length > 0 && (
              <GalleryList />
            )}
          </Box>
        </CardContent>
      </Card>
      <ModalListingDetail
        open={showModal}
        listing={listing}
        onCancel={handleCloseModal}
      />
    </Fragment>
  );
};

ListingCard.defaultProps = {
  size: 'large'
};
