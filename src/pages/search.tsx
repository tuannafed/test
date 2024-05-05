import 'react-multi-carousel/lib/styles.css';

import { Box, Container, Typography } from '@mui/material';
import { ActionCreate, Layout } from 'components';
import { SearchBox } from 'modules/Categories';
import {
  ListingList,
  actionsListing,
  useSelectFilterListing
} from 'modules/Listings';
import { useEffect, useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { getUserLocation } from 'common/localStorage';
import { USER_LOCATION } from 'constants/common';
import { withPublicAuth } from 'hoc';
import { actionsAuth, useSelectAuthStore } from 'modules/Auth';
import { useRouter } from 'next/router';
import { parseRouteQueryToObject } from 'utils';
import formatStateAbbrToName from 'utils/formatStateAbbrToName';

export async function getServerSideProps(context) {
  return {
    props: {
      images: '/images/social_share_image.png',
      title: 'AhaViet - Rao vặt người việt ở Mỹ, Hoa Kỳ',
      url: process.env.NEXT_PUBLIC_URL
    }
  };
}

export function HomePage({ images }) {
  const { currentUser } = useSelectAuthStore();

  const filter = useSelectFilterListing();

  const userLocation = getUserLocation();

  const defaultLocation = USER_LOCATION;

  const city = userLocation?.city || defaultLocation.location.city;

  const stateName =
    userLocation?.shortcode || defaultLocation.location.shortcode;

  const [showData, setShowData] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { query } = useRouter();

  const searchData = query?.q || '';

  useEffect(() => {
    const loginData = parseRouteQueryToObject(query) as any;

    if (loginData.firstlogin) {
      dispatch(actionsAuth.toggleLocationPicker());
    }

    if (searchData) {
      dispatch(
        actionsListing.setFilter({
          ...global.globalLocation,
          ...filter,
          name: searchData
        })
      );
      setShowData(true);
    } else {
      dispatch(
        actionsListing.setFilter({
          ...global.globalLocation,
          ...filter
        })
      );
      setShowData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previewImage = '/images/social_share_image.png';
  const titleName = 'AhaViet - Rao vặt người việt ở Mỹ, Hoa Kỳ';
  const extraTags = [
    <meta key="og:title" property="og:title" content={titleName} />,
    <meta key="og:image" property="og:image" content={previewImage} />,
    <meta key="twitter:title" name="twitter:title" content={titleName} />,
    <meta key="twitter:image" name="twitter:image" content={previewImage} />
  ];

  return (
    <Layout title={titleName} extraMetaTags={extraTags}>
      <Container>
        <Box>
          <SearchBox />
        </Box>
        {filter?.name || searchData ? (
          <Box mt={3.75}>
            <Typography variant="h4" color="primary">
              {`Kết quả tìm kiếm từ khoá "${
                showData ? filter?.name ?? searchData : searchData
              }" gần ${city}, ${formatStateAbbrToName(stateName)}`}
            </Typography>
          </Box>
        ) : (
          <Box mt={3.75}>
            <Typography variant="h4" color="primary">
              {`Kết quả tìm kiếm gần ${city}, ${formatStateAbbrToName(
                stateName
              )}`}
            </Typography>
          </Box>
        )}
        <div style={{ margin: '30px 0' }}>{showData && <ListingList />}</div>
      </Container>
      {currentUser && <ActionCreate />}
    </Layout>
  );
}

export default withPublicAuth(HomePage);
