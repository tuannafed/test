import { Box, Container, Grid, Typography } from '@mui/material';
import {
  ActionCreate,
  BreadcrumbItem,
  CustomBreadcrumbs,
  Layout,
  LinearBreadcrumb
} from 'components';
import {
  IListingFilter,
  actionsListing,
  useSelectFilterListing
} from 'modules/Listings';
import { useEffect, useMemo, useState } from 'react';

import { categoryService } from 'common/api';
import { useAppDispatch } from 'common/hooks';
import { getUserLocation } from 'common/localStorage';
import { USER_LOCATION } from 'constants/common';
import { withPublicAuth } from 'hoc';
import { useSelectAuthStore } from 'modules/Auth';
import { SearchBox } from 'modules/Categories';
import { ListingList, TagList } from 'modules/Listings';
import { redirect } from 'utils';
import formatStateAbbrToName from 'utils/formatStateAbbrToName';

export function HomePage({
  category,
  relatedCategories,
  menuIndex,
  title,
  images
}) {
  const dispatch = useAppDispatch();
  const [activeSubcategoryIndex, setCategoryIndex] = useState(menuIndex);

  const filterListings: IListingFilter = useSelectFilterListing();

  const { currentUser } = useSelectAuthStore();

  const [updatedFilter, setUpdatedFilter] = useState(false);

  const userLocation = getUserLocation();

  const defaultLocation = USER_LOCATION;

  const city = userLocation?.city || defaultLocation.location.city;

  const stateName =
    userLocation?.shortcode || defaultLocation.location.shortcode;

  useEffect(() => {
    setUpdatedFilter(false);
    if (currentUser._id) {
      dispatch(
        actionsListing.setFilter({
          ...global.globalLocation,
          subcategory: category._id,
          userId: currentUser._id
        })
      );
    } else {
      dispatch(
        actionsListing.setFilter({
          ...global.globalLocation,
          subcategory: category._id
        })
      );
    }
    setUpdatedFilter(true);
  }, []);

  const routers: BreadcrumbItem[] = useMemo(() => {
    const { distance } = filterListings;
    const userLocation = getUserLocation();
    return relatedCategories.map(category => {
      const url = `/listings/${category.slug}?distance=${distance}&zip=${userLocation?.zipcode}`;
      if (distance && userLocation?.zipcode) {
        return {
          id: category._id,
          name: category.name,
          url
        };
      } else {
        return {
          id: category._id,
          name: category.name,
          url: `/listings/${category.slug}`
        };
      }
    });
  }, [relatedCategories, filterListings]);

  const onRouterChange = (item: BreadcrumbItem, index: number) => {
    setCategoryIndex(index);
    dispatch(
      actionsListing.setFilter({
        ...filterListings,
        subcategory: item.id
      })
    );
    redirect(item.url);
  };

  const handleClearFilter = (e: any) => {
    const newFilter = { ...filterListings };
    if (newFilter?.name) {
      delete newFilter.name;
    }
    dispatch(
      actionsListing.setFilter({
        ...newFilter
      })
    );
  };

  const previewImage = '/images/social_share_image.png';
  const titleName = `${title} - ${
    relatedCategories[activeSubcategoryIndex]?.name
  } gần ${city}, ${formatStateAbbrToName(stateName)}`;
  const extraTags = [
    <meta key="og:title" property="og:title" content={titleName} />,
    <meta key="og:image" property="og:image" content={previewImage} />,
    <meta key="twitter:title" name="twitter:title" content={titleName} />,
    <meta key="twitter:image" name="twitter:image" content={previewImage} />
  ];

  return (
    <Layout title={titleName} extraMetaTags={extraTags}>
      <div>
        <Container>
          <Grid>
            <Grid item md={7}></Grid>
            <Grid item md={5} ml="auto">
              <SearchBox />
            </Grid>
          </Grid>
          <div style={{ marginTop: '20px' }}>
            {routers.length > 3 ? (
              <CustomBreadcrumbs
                data={routers}
                index={activeSubcategoryIndex}
                handleBreadcrumbChange={onRouterChange}
              />
            ) : (
              <LinearBreadcrumb
                data={routers}
                index={activeSubcategoryIndex}
                handleBreadcrumbChange={onRouterChange}
              />
            )}
          </div>

          <Box mt={2}>
            <TagList subcategory={category._id} />
          </Box>
          <Box mt={2}>
            <Typography variant="h4" color="primary">
              {title} - {relatedCategories[activeSubcategoryIndex]?.name} gần{' '}
              {city}, {formatStateAbbrToName(stateName)}
            </Typography>
          </Box>
          {filterListings?.name && (
            <Box mt={2}>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontSize: '14px' }}
              >
                <div>
                  <span
                    style={{ fontWeight: 'normal' }}
                  >{`Kết quả tìm kiếm đang được lọc theo từ khoá "${filterListings?.name}" - `}</span>
                  <span
                    style={{
                      alignItems: 'center',
                      color: '#47487b',
                      fontWeight: 'normal',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                    onClick={handleClearFilter}
                  >
                    Bỏ lọc theo từ khoá
                  </span>
                </div>
              </Typography>
            </Box>
          )}
          {updatedFilter && (
            <Box mt={2}>
              <ListingList />
            </Box>
          )}
        </Container>
        {currentUser && <ActionCreate />}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const category = await categoryService.getSubCategoryBySlug(slug);
  const categoryData = category.data.data;
  const allCategories = await categoryService.getCategories();
  const listCategories = allCategories.data.data || [];

  let currentMenuIndex = 0;
  const relatedSubcategory = listCategories.find(findingCategory => {
    const subCategories = findingCategory.sub_categories || [];
    const subCategory = subCategories.find(findingSubCategory => {
      return findingSubCategory._id === categoryData._id;
    });
    const findCatndex = subCategories.findIndex(findingSubCategory => {
      return findingSubCategory._id === categoryData._id;
    });
    if (findCatndex >= 0) {
      currentMenuIndex = findCatndex;
    }
    return subCategory;
  });

  return {
    props: {
      category: categoryData || {},
      relatedCategories: relatedSubcategory.sub_categories || [],
      menuIndex: currentMenuIndex,
      title: relatedSubcategory.name || '',
      images: '/images/social_share_image.png'
    }
  };
}

export default withPublicAuth(HomePage);
