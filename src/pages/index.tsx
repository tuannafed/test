import 'react-multi-carousel/lib/styles.css';

import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { ActionCreate, EnhanceImage, Layout } from 'components';
import {
  ZIPCODE_GARDENGROVE,
  ZIPCODE_SANJOSE,
  USER_LOCATION as defaultLocation
} from 'constants/common';
import { actionsAuth, useSelectAuthStore } from 'modules/Auth';
import { CategoryGridList, SearchBox } from 'modules/Categories';

import { useAppDispatch } from 'common/hooks';
import { getDistance } from 'common/localStorage';
import { withPublicAuth } from 'hoc';
import { SliderAds } from 'modules/Dashboard';
import { ListingList } from 'modules/Listings';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { parseRouteQueryToObject } from 'utils';

export async function getServerSideProps() {
  return {
    props: {
      images: '/images/social_share_image.png',
      title: 'AhaViet - Rao vặt người việt ở Mỹ, Hoa Kỳ',
      url: process.env.NEXT_PUBLIC_URL
    }
  };
}

export function HomePage() {
  const { currentUser } = useSelectAuthStore();

  const distance =
    currentUser.distance || getDistance() || defaultLocation.distance;

  const dispatch = useAppDispatch();

  const { query } = useRouter();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loginData: any = parseRouteQueryToObject(query);
    if (loginData.firstlogin) {
      dispatch(actionsAuth.toggleLocationPicker());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const dataSearchPopular = [
    {
      id: 1,
      primary_city: 'Garden Grove',
      title: 'Nhà cho thuê nguyên căn ở gần Garden Grove, California',
      link: `listings/cho-thue-nguyen-can?distance=${distance}&zip=${ZIPCODE_GARDENGROVE}`
    },
    {
      id: 2,
      primary_city: 'Garden Grove',
      title: 'Phòng cho thuê ở gần Garden Grove, California',
      link: `listings/phong-cho-thue?distance=${distance}&zip=${ZIPCODE_GARDENGROVE}`
    },
    {
      id: 3,
      primary_city: 'San Jose',
      title: 'Nhà cho thuê nguyên căn ở gần San Jose, California',
      link: `listings/cho-thue-nguyen-can?distance=${distance}&zip=${ZIPCODE_SANJOSE}`
    },
    {
      id: 4,
      primary_city: 'San Jose',
      title: 'Phòng cho thuê ở gần San Jose, California',
      link: `listings/phong-cho-thue?distance=${distance}&zip=${ZIPCODE_SANJOSE}`
    }
  ];

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
        <SliderAds />
        <Grid paddingX={2}>
          <Grid item md={7}></Grid>
          <Grid
            item
            md={5}
            ml="auto"
            sx={{
              width: {
                lg: '50%',
                md: '100%'
              }
            }}
          >
            <SearchBox />
          </Grid>
        </Grid>
        <div style={{ margin: '10px 0 20px 0' }}>
          <CategoryGridList />
        </div>
        <Box>
          <Typography variant="h4" color="primary" mb={3.75}>
            Tìm kiếm rao vặt phổ biến
          </Typography>
          <Box mx={-1}>
            <Carousel responsive={responsive}>
              {dataSearchPopular.map((slider, index) => (
                <Link key={slider.id} href={slider.link}>
                  <Box
                    px={1}
                    position="relative"
                    key={slider.id}
                    className="cursor-pointer"
                    height="50%"
                    marginBottom={2}
                  >
                    <EnhanceImage
                      imageUrl={
                        slider.primary_city == 'San Jose'
                          ? '/images/sanjose-museum-img.jpg'
                          : slider.primary_city == 'Garden Grove'
                          ? '/images/garden-grove-img.jpg'
                          : '/images/usa-default.jpg'
                      }
                      sx={{ p: 2 }}
                      borderRadius={5}
                      boxShadow="0 5px 5px rgba(128, 128, 128, 1)"
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        bottom: -92,
                        right: 0,
                        p: 2,
                        background:
                          'linear-gradient(to top,rgb(0 0 0 / 60%) 0,rgb(0 0 0 / 60%) calc(100% - 40px),rgb(0 0 0 / 0%) 100%)',
                        mx: 1,
                        zIndex: 10
                      }}
                      borderRadius={[0, 0, 5, 5]}
                    >
                      <Typography
                        variant="body1"
                        color="white"
                        fontWeight={450}
                        sx={{ textShadow: '0px 0px 6px rgb(81 67 21 / 80%)' }}
                      >
                        {slider.title}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Carousel>
          </Box>
        </Box>
        <Box mt={3.75}>
          <Typography variant="h4" color="primary">
            Rao vặt mới nhất ở Mỹ, Hoa Kỳ
          </Typography>
        </Box>
        <div style={{ margin: '30px 0' }}>
          <ListingList notFilter maxListing={15} />
        </div>
      </Container>
      {currentUser && <ActionCreate />}
    </Layout>
  );
}

export default withPublicAuth(HomePage);
