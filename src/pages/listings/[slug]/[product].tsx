import {
  BreadcrumbItem,
  CustomBreadcrumbs,
  Layout,
  LinearBreadcrumb,
  SocialShare
} from 'components';
/* eslint-disable react-hooks/exhaustive-deps */
import { Collapse, Container, Grid } from '@mui/material';
import { authService, categoryService, listingService } from 'common/api';
import { showConfirm, showSuccess } from 'common/swalAlert';
import {
  DetailContent,
  IListingDetail,
  actionsListing
} from 'modules/Listings';
import React, { useEffect, useMemo, useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { getToken } from 'common/localStorage';
import { ISubCategory } from 'modules/Categories';
import { IUser } from 'modules/Users';
import { useSnackbar } from 'notistack';
import { redirect } from 'utils';

interface ProductPageProps {
  subcategory: ISubCategory;
  listing: IListingDetail;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  relatedCategories: any;
  menuIndex: number;
}
export const ProductPage: React.FC<ProductPageProps> = ({
  subcategory,
  listing,
  relatedCategories,
  menuIndex
}) => {
  const [listingState, setListing] = useState(listing);
  const [isExpandShare, setExpandShare] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser>({});

  const token = getToken();
  const dispatch = useAppDispatch();
  const domain = process.env.NEXT_PUBLIC_URL;
  const shareLink = `${domain}/listings/${subcategory.slug}/${listing.slug}`;
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
  const routers: BreadcrumbItem[] = useMemo(() => {
    return relatedCategories.map(category => {
      return {
        id: category._id,
        name: category.name,
        url: `/listings/${category.slug}`
      };
    });
  }, [relatedCategories]);

  const onRouterChange = (item: BreadcrumbItem) => {
    redirect(item.url);
  };

  // const back = () => {
  //   redirect(`/listings/${subcategory.slug}`)
  // }

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

  const previewImage =
    listing.galleries && listing.galleries.length > 0
      ? listing.galleries[0].image
      : '/images/social_share_image.png';
  const extraTags = [
    <meta key="og:url" property="og:url" content={shareLink} />,
    <meta key="og:type" property="og:type" content="article" />,
    <meta key="og:title" property="og:title" content={listing.name} />,
    <meta
      key="og:description"
      property="og:description"
      content={listing.descripton}
    />,
    <meta key="og:image" property="og:image" content={previewImage} />,

    <meta
      key="twitter:card"
      name="twitter:card"
      content="summary_large_image"
    />,
    <meta
      key="twitter:domain"
      property="twitter:domain"
      content={`${domain}`}
    />,
    <meta key="twitter:url" property="twitter:url" content={shareLink} />,
    <meta key="twitter:title" name="twitter:title" content={listing.name} />,
    <meta
      key="twitter:description"
      name="twitter:description"
      content={listing.descripton}
    />,
    <meta key="twitter:image" name="twitter:image" content={previewImage} />
  ];

  return (
    <Layout title={listingState.name} extraMetaTags={extraTags}>
      <Container>
        <Grid>
          <Grid
            item
            md={7}
            xs={12}
            sx={{
              width: {
                xl: '50%',
                lg: '70%',
                sm: '100%'
              }
            }}
          >
            {/* <Button 
                  onClick={back}
                  sx = {{
                    ":hover": {
                      backgroundColor: "transparent"
                    }
                  }}
                >
                  <Chip  
                    label="Trở về trang trước"
                    sx = {{
                      ":hover": {
                        cursor: 'pointer'
                      }
                    }}
                    icon={<ArrowBack />} 
                    color="primary"/>
                </Button> */}
            {routers.length > 3 ? (
              <CustomBreadcrumbs
                data={routers}
                index={menuIndex}
                handleBreadcrumbChange={onRouterChange}
              />
            ) : (
              <LinearBreadcrumb
                data={routers}
                index={menuIndex}
                handleBreadcrumbChange={onRouterChange}
              />
            )}
          </Grid>
        </Grid>
        <DetailContent
          listing={listingState}
          onToggleSave={onToggleLike}
          toggleExpandShare={toggleExpandShare}
          report={report}
        />
        <Grid container>
          <Grid item md={5} xs={12} sx={{}}></Grid>
          <Grid
            item
            md={7}
            xs={12}
            sx={{
              width: {
                xl: '50%',
                lg: '70%',
                sm: '100%'
              }
            }}
          >
            <Collapse in={isExpandShare} unmountOnExit>
              <SocialShare
                link={shareLink}
                media={previewImage}
                urlCopy={shareLink}
              />
            </Collapse>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { slug, product } = context.params;
  const category = await categoryService.getSubCategoryBySlug(slug);
  const categoryData = category.data.data;
  const detailListing = await listingService.getDetailBySlug(product);
  const detailListingData = detailListing.data.data;

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
      subcategory: categoryData,
      listing: detailListingData,
      relatedCategories: relatedSubcategory.sub_categories || [],
      menuIndex: currentMenuIndex
    }
  };
}

export default ProductPage;
