import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Radio,
  Stack,
  Typography
} from '@mui/material';
import {
  RHFRadio,
  RHFSelect,
  RHFTextInput,
  RHFTextarea,
  RHFUpload
} from 'components';
import { CREATE_FROM, RECURSIONS, UNITS } from 'constants/common';
import { LocationPicker, actionsAuth } from 'modules/Auth';
import { ICategory, ISubCategory } from 'modules/Categories';
import {
  ICreateListingFormStep1,
  ICreateListingFormStep2,
  ICreateListingFormStep3,
  actionsListing,
  schemaValidateCreateListingStep2,
  schemaValidateCreateListingStep3,
  shemaValidateCreateListingStep1,
  useSelectCreateListing
} from 'modules/Listings';
import React, { useEffect, useMemo, useState } from 'react';
import {
  arrayToObjectFormKey,
  convertToSlug,
  redirect,
  stackCallback,
  toFormData
} from 'utils';

import { yupResolver } from '@hookform/resolvers/yup';
import { LocationOn } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { categoryService } from 'common/api';
import { useAppDispatch } from 'common/hooks';
import { getToken } from 'common/localStorage';
import { LISTING_STATUS } from 'constants/common';
import { isArray } from 'lodash';
import { useSelectAuthStore } from 'modules/Auth';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { Location } from '../types';
import { CreateTagList } from './CreateTagList';

let cacheTags: Array<string> = [];
let cacheRecursion = '';
let cacheRemove: Array<Number> = [];

export const CreateForm: React.FC<any> = ({ listing }) => {
  const router = useRouter();

  const { step } = useSelectCreateListing();

  const dispatch = useAppDispatch();

  const [categores, setCategories] = useState<Array<ICategory>>([]);

  const { enqueueSnackbar } = useSnackbar();

  const token = getToken();

  const { currentUser } = useSelectAuthStore();

  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalPosting, setShowModalPosting] = useState(false);
  const [showModalPosted, setShowModalPosted] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [messageNoti, setMessageNoti] = useState(LISTING_STATUS.CREATE_MESSAGE);

  const defaultValues = useMemo(() => {
    return {
      images: [],
      name: '',
      category: '',
      subcategory: '',
      price: 0,
      unit: '',
      descripton: '',
      recursion: '',
      has_price: true,
      location: {
        type: 'Point',
        coordinates: [
          currentUser?.location?.coordinates?.[1] || 0,
          currentUser?.location?.coordinates?.[0] || 0
        ],
        city: currentUser?.location.city || ''
      },
      tags: []
    };
  }, [currentUser?.location.city, currentUser?.location?.coordinates]);

  const coverEditableListing = (listing: any) => {
    return {
      ...listing,
      has_price: listing.price ? true : false,
      category: listing?.subcategory?.parrent,
      subcategory: listing?.subcategory?._id,
      tags: listing?.tags?.map(tag => tag._id)
    };
  };

  const editableListing = useMemo(() => {
    return listing ? coverEditableListing(listing) : {};
  }, [listing]);

  const isEdit = useMemo(() => {
    return listing && listing._id;
  }, [listing]);

  const [listingCreate, setListingCreate] = useState<any>(
    isEdit ? editableListing : defaultValues
  );

  useEffect(() => {
    setListingCreate(isEdit ? editableListing : defaultValues);
  }, [isEdit, editableListing, defaultValues]);

  const selectedTags = useMemo(() => {
    return listingCreate.tags || [];
  }, [listingCreate.tags]);

  // const subcategoryChange = watch().subcategory as string;
  useEffect(() => {
    categoryService.getCategories().then(({ data }) => {
      setCategories(data.data);
    });
  }, []);

  const redirectToEdit = () => {
    redirect('/user/listings');
  };

  const nextStep = () => {
    if (step == 2) {
      return;
    }
    dispatch(actionsListing.setStep(step + 1));
  };

  const previousStep = () => {
    if (step == 0) {
      if (isEdit) {
        redirect('/user/listings');
      } else {
        redirect('/');
      }
    }

    dispatch(actionsListing.setStep(step - 1));
  };

  const resetForm = () => {
    setListingCreate(defaultValues);
    cacheRemove = [];
    dispatch(actionsListing.setStep(0));
  };

  useEffect(() => {
    return () => {
      resetForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actions = (
    <>
      <Button
        sx={{
          color: 'white'
        }}
        size="small"
        onClick={redirectToEdit}
      >
        Xem trong trang chỉnh sửa
      </Button>
      <Button
        sx={{
          color: 'white'
        }}
        size="small"
        onClick={resetForm}
      >
        Tạo tin khác
      </Button>
    </>
  );

  const togglePicker = () => {
    dispatch(actionsAuth.toggleLocationPicker());
  };

  const redirectListingPage = (id: any) => {
    if (id) {
      categoryService
        .getSubCategories(listingCreate.category)
        .then(({ data }) => {
          const slug = data.data.find(
            item => item._id == listingCreate.subcategory
          );
          if (slug) {
            stackCallback(() => {
              router.push({
                pathname: `/listings/${slug.slug}/${convertToSlug(
                  listingCreate.name
                )}`,
                query: {
                  subcategory: slug.slug,
                  product: convertToSlug(listingCreate.name)
                }
              });
            }, 500);
          }
        });
    }
  };

  const sendCreateListing = (data: any) => {
    setShowModalPosting(true);
    setMessageNoti(LISTING_STATUS.CREATE_MESSAGE);
    setListingCreate({
      ...listingCreate,
      ...data
    });

    stackCallback(() => {
      const postData = {
        name: listingCreate.name,
        descripton: listingCreate.descripton,
        subcategory: listingCreate.subcategory,
        price: listingCreate.price,
        recursion: data.recursion,
        has_price: listingCreate.has_price,
        slug: convertToSlug(listingCreate.name),
        unit: listingCreate.unit,
        'location[type]': 'Point',
        'location[coordinates][0]': listingCreate.location.coordinates[0],
        'location[coordinates][1]': listingCreate.location.coordinates[1],
        'location[city]': listingCreate.location.city,
        ...arrayToObjectFormKey('tags', cacheTags)
      };

      const formData = toFormData(postData);

      if (isArray(listingCreate.images)) {
        listingCreate.images.forEach((file, index) => {
          formData.append('images', file);
        });
      }

      dispatch(
        actionsListing.createtListing({
          token,
          id: currentUser._id,
          body: formData
        })
      )
        .unwrap()
        .then(res => {
          if (!res.data) return;
          setShowModalPosting(false);
          setShowModalPosted(true);

          const newEditableListing = coverEditableListing(res.data);

          setListingCreate(newEditableListing);
        })
        .catch(err => {
          setShowModalPosting(false);
          setShowModalError(true);
        });
    }, 500);
  };

  const sendEditListing = (id, data: any) => {
    setShowModalPosting(true);
    setMessageNoti(LISTING_STATUS.UPDATE_MESSAGE);
    setListingCreate({
      ...listingCreate,
      ...data
    });

    stackCallback(() => {
      const postData = {
        name: listingCreate.name,
        descripton: listingCreate.descripton,
        price: listingCreate.price,
        recursion: data.recursion,
        slug: convertToSlug(listingCreate.name),
        subcategory: listingCreate.subcategory,
        has_price: listingCreate.has_price,
        unit: listingCreate.unit,
        'location[type]': 'Point',
        'location[coordinates][0]': listingCreate.location.coordinates[0],
        'location[coordinates][1]': listingCreate.location.coordinates[1],
        'location[city]': listingCreate.location.city,
        ...arrayToObjectFormKey('tags', cacheTags || []),
        ...arrayToObjectFormKey('remove', cacheRemove || [])
      };

      const formData = toFormData(postData);

      if (isArray(listingCreate.images)) {
        listingCreate.images.forEach((file, index) => {
          if (!file._id) {
            formData.append('images', file);
          }
        });
      }

      dispatch(
        actionsListing.editListings({
          token,
          id,
          body: formData
        })
      )
        .unwrap()
        .then(res => {
          if (!res.data) return;
          setShowModalPosting(false);
          setShowModalPosted(true);

          const newEditableListing = coverEditableListing(res.data);

          setListingCreate(newEditableListing);
        })
        .catch(err => {
          setShowModalPosting(false);
          setShowModalError(true);
        });
    }, 500);
  };

  const onSubmit = (data: any) => {
    if (step === 0) {
      if ((data?.images?.length || 0) <= 0) {
        setListingCreate({
          ...listingCreate,
          ...data
        });
        setShowModal(true);
        return;
      }
    }
    if (step < 2) {
      setListingCreate({
        ...listingCreate,
        ...data
      });

      stackCallback(nextStep, 500);
    } else {
      // VALIDATE LOCATION FORM
      if (listingCreate.location.city == '') {
        enqueueSnackbar(LISTING_STATUS.LOCATION_EMPTY, { variant: 'error' });
        return;
      }
      // SUBMIT DATA
      const sendData = {
        ...data,
        tags: cacheTags
      };

      if (isEdit) {
        sendEditListing(listingCreate._id, sendData);
      } else {
        sendCreateListing(sendData);
      }
    }
  };

  const handleCancelModal = () => {
    setShowModal(false);
    setOpenFileDialog(false);
    nextStep();
  };

  const handleOkModal = () => {
    setShowModal(false);
    setOpenFileDialog(true);
  };

  const NextButton = () => {
    return (
      <Grid container mt={3}>
        <Grid item md={8} xs={12}>
          <Box justifyContent="center" display="flex">
            <Button
              variant="outlined"
              sx={{ margin: '0 20px' }}
              onClick={previousStep}
            >
              {step === 0 ? 'Huỷ' : 'Quay lại'}
            </Button>
            <Button variant="contained" sx={{ margin: '0 20px' }} type="submit">
              {step == 2 ? 'Đăng tin' : 'Tiếp tục'}
            </Button>
          </Box>
        </Grid>

        <Dialog
          open={showModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              width: {
                sm: '100%',
                md: '500px'
              }
            }}
          >
            <Box textAlign="center">
              <WarningAmberIcon
                color="warning"
                sx={{ fontSize: 48, mr: 0.5, mt: 0.2 }}
              />
              <Typography
                sx={{
                  margin: '5px 0'
                }}
              >
                Bài đăng có hình ảnh sẽ có rất nhiều tương tác hơn. Bạn có muốn
                thêm hình ảnh? Chỉ mất vài giây thôi!
              </Typography>
            </Box>
            <Typography textAlign="center" fontSize="13px" fontStyle="italic">
              Kích thước tập tin: 20MB - Loại tệp: .jpeg, .png
            </Typography>
          </DialogContent>
          <Box textAlign="center">
            <Button onClick={handleCancelModal}>Không cần hình ảnh</Button>
            <Button
              autoFocus
              variant="contained"
              color="primary"
              sx={{
                margin: '20px 40px'
              }}
              onClick={handleOkModal}
            >
              Đăng hình
            </Button>
          </Box>
        </Dialog>
        <Box
          textAlign="center"
          display={showModalPosting ? 'flex' : 'none'}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            bgcolor: 'rgba(0, 0, 0, 0.5);'
          }}
        >
          <Box
            bgcolor="#fff"
            height="210px"
            width={{ xs: 300, md: 500 }}
            borderRadius={1}
          >
            <Typography
              sx={{
                mt: 4,
                mb: 4,
                fontSize: 18
              }}
            >
              Rao vặt đang được {messageNoti}
            </Typography>
            <Backdrop
              open={true}
              sx={{
                color: '#fff',
                zIndex: theme => theme.zIndex.drawer + 1,
                backgroundColor: 'transparent',
                position: 'relative'
              }}
            >
              <Box className="spinner"></Box>
            </Backdrop>
          </Box>
        </Box>
        <Dialog
          open={showModalPosted}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              width: {
                sm: '100%',
                md: '500px'
              }
            }}
          >
            <Box textAlign="center">
              <CheckCircleIcon
                color="success"
                sx={{ fontSize: 48, mr: 0.5, mt: 0.2 }}
              />
              <Typography
                sx={{
                  margin: '5px 0'
                }}
              >
                Rao vặt {messageNoti} thành công
              </Typography>
            </Box>
          </DialogContent>
          <Box
            textAlign="center"
            sx={{
              p: { xs: 2, sm: 4 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                dispatch(actionsListing.setStep(0));
                setListingCreate(defaultValues);
                redirect('/listings/create');
                setShowModalPosted(false);
              }}
              sx={{ fontSize: { xs: 12, sm: 16 }, mr: 1 }}
            >
              Đăng rao vặt khác
            </Button>
            <Button
              autoFocus
              variant="contained"
              color="primary"
              onClick={() => redirectListingPage(listingCreate._id)}
              sx={{ fontSize: { xs: 12, sm: 16 }, ml: 1 }}
            >
              Xem bài đăng
            </Button>
          </Box>
        </Dialog>
        <Dialog
          open={showModalError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              width: {
                sm: '100%',
                md: '500px'
              }
            }}
          >
            <Box textAlign="center">
              <WarningAmberIcon
                color="warning"
                sx={{ fontSize: 48, mr: 0.5, mt: 0.2 }}
              />
              <Typography
                sx={{
                  margin: '5px 0'
                }}
              >
                Có lỗi xảy ra. Vui lòng thử lại
              </Typography>
            </Box>
          </DialogContent>
          <Box textAlign="center">
            <Button
              autoFocus
              variant="contained"
              color="primary"
              sx={{
                margin: '20px 40px',
                fontSize: { xs: 12, sm: 16 }
              }}
              onClick={() => setShowModalError(false)}
            >
              Đóng thông báo
            </Button>
          </Box>
        </Dialog>
      </Grid>
    );
  };

  const Step1 = () => {
    const { control, setValue, handleSubmit, watch } =
      useForm<ICreateListingFormStep1>({
        defaultValues: listingCreate,
        resolver: yupResolver(shemaValidateCreateListingStep1)
      });

    useEffect(() => {
      if (isEdit) {
        const previousListing = listingCreate.images || listingCreate.galleries;
        setValue('images', previousListing);
      }
    });

    const handleAppendImage = (files: FileList) => {
      const previousListing = listingCreate.images || listingCreate.galleries;
      setListingCreate({
        ...listingCreate,
        name: watch('name'),
        images: [...previousListing, ...Array.from(files)]
      });

      stackCallback(() => {
        setValue('images', listingCreate.images);
      }, 1000);
    };

    const handleRemoveImage = (file, index) => {
      const previousListing = listingCreate.images || listingCreate.galleries;
      const newListing = previousListing.filter((item, i) => i !== index);

      if (file._id) {
        cacheRemove.push(file._id);
      }

      setListingCreate({
        ...listingCreate,
        name: watch('name'),
        images: newListing
      });

      stackCallback(() => {
        setValue('images', newListing);
      });
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid item md={8} xs={12}>
            <Typography marginTop={2} marginBottom={1}>
              {CREATE_FROM.LISTING_TITLE}
            </Typography>
            <RHFTextarea
              variant="outlined"
              control={control}
              id="name"
              fullWidth
              maxLetters={100}
              valueWatch={watch('name').length}
              name="name"
              label="Tiêu đề"
            />
          </Grid>

          <Grid item md={8} xs={12}>
            <Typography marginTop={2}>{CREATE_FROM.UPLOAD_TITLE}</Typography>
            <RHFUpload
              id="images"
              name="images"
              control={control}
              multiple={true}
              edit={true}
              onChangeCb={handleAppendImage}
              onRemoveCb={handleRemoveImage}
              openFileDialog={openFileDialog}
              setOpenFileDialog={setOpenFileDialog}
              // onChangeCb={file => handleUploadApi(file)}
            />
          </Grid>
        </Grid>
        <NextButton />
      </form>
    );
  };

  const onChangeLocation = data => {
    const location: Location = {
      type: 'Point',
      coordinates: [data.coordinates.lng, data.coordinates.lat],
      city: data.city || data.address
    };

    setListingCreate({
      ...listingCreate,
      location: location
    });
  };

  const Step2 = () => {
    const { control, setValue, handleSubmit, watch } =
      useForm<ICreateListingFormStep2>({
        defaultValues: listingCreate,
        resolver: yupResolver(schemaValidateCreateListingStep2)
      });

    const categoryChange = watch().category as string;
    const [subcategories, setSubCategories] = useState<Array<ISubCategory>>([]);

    useEffect(() => {
      if (categoryChange) {
        categoryService.getSubCategories(categoryChange).then(({ data }) => {
          setSubCategories(data.data);
        });
      }
    }, [categoryChange]);

    useEffect(() => {
      if (watch('has_price').toString() === 'false') {
        setValue('price', 0);
        setValue('unit', '');
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('has_price')]);

    const categoriesPickData = categores.map(category => ({
      text: category.name,
      value: category._id
    }));

    const subCategoriesPickData = subcategories.map(subcategory => ({
      text: subcategory.name,
      value: subcategory._id
    }));

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid item md={8} xs={12}>
            <Typography marginTop={2} marginBottom={2}>
              {CREATE_FROM.CATEGORY_TITLE}
            </Typography>
            <RHFSelect
              name="category"
              control={control}
              variant="outlined"
              fullWidth
              label="Danh mục"
              options={categoriesPickData}
            />
          </Grid>

          <Grid item md={8} xs={12}>
            <Typography marginTop={2} marginBottom={2}>
              {CREATE_FROM.SUBCATEGORY_TITLE}
            </Typography>
            <RHFSelect
              name="subcategory"
              control={control}
              variant="outlined"
              fullWidth
              label="Danh mục con"
              options={subCategoriesPickData}
            />
          </Grid>

          <Grid item md={8} xs={12} mt={3}>
            <RHFRadio
              control={control}
              name="has_price"
              defaultValue={true}
              row
              options={[
                {
                  label: 'Không hiển thị giá hoặc giá không cố định',
                  value: false,
                  control: <Radio />
                },
                {
                  label: 'Điền thông tin giá bán/giá thuê',
                  value: true,
                  control: <Radio />
                }
              ]}
            />
          </Grid>
          {watch('has_price').toString() === 'true' && (
            <Grid item md={8} xs={12} mt={3}>
              <Grid container>
                <Grid item xs={2}>
                  <Typography marginTop={2}>
                    {CREATE_FROM.PRICE_TITLE}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <RHFTextInput
                    variant="outlined"
                    control={control}
                    id="price"
                    name="price"
                    type="number"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Stack direction="row" sx={{ w: '200px' }}>
                    <Typography marginTop={2} mx={1} variant="h6">
                      {' '}
                      /{' '}
                    </Typography>
                    <RHFSelect
                      name="unit"
                      control={control}
                      defaultValue="day"
                      variant="outlined"
                      sx={{
                        minWidth: '100px'
                      }}
                      label={CREATE_FROM.UNIT}
                      options={UNITS}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item md={8} xs={12}>
            <Typography marginTop={2} marginBottom={2}>
              {CREATE_FROM.DESCRIPTION}
            </Typography>
            <RHFTextarea
              name="descripton"
              control={control}
              variant="outlined"
              fullWidth
              valueWatch={watch('descripton').length}
              maxRows={8}
              minRows={15}
            />
          </Grid>
        </Grid>
        <NextButton />
      </form>
    );
  };

  const onTagsChange = (tags: Array<string>) => {
    cacheTags = tags;
  };

  const Step3 = ({ previousRecursion }) => {
    const { control, setValue, handleSubmit, watch } =
      useForm<ICreateListingFormStep3>({
        defaultValues: listingCreate,
        resolver: yupResolver(schemaValidateCreateListingStep3)
      });

    const recursionState = watch().recursion as string;

    if (recursionState) {
      cacheRecursion = recursionState;
    }

    useEffect(() => {
      previousRecursion && setValue('recursion', previousRecursion);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: '400px' }}
        key="form"
      >
        <Grid container>
          <Grid item md={8} xs={12}>
            <Typography marginTop={2} marginBottom={2}>
              {CREATE_FROM.LOCATION_TITLE}
            </Typography>
            <Stack direction="row" alignItems="center">
              <LocationOn />
              <Typography color="gray" mr={2}>
                {listingCreate?.location?.city}
              </Typography>
              <Button variant="contained" onClick={togglePicker}>
                {' '}
                Sửa
              </Button>
            </Stack>
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography marginTop={2} marginBottom={2}>
              {CREATE_FROM.RECURSION_TITLE}
            </Typography>
            <RHFSelect
              name="recursion"
              control={control}
              variant="outlined"
              sx={{
                minWidth: '160px'
              }}
              options={RECURSIONS}
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography marginTop={2} marginBottom={2}>
              {CREATE_FROM.TAG_TITLE}
            </Typography>
            <CreateTagList
              subcategory={listingCreate.subcategory}
              initSelectedTags={selectedTags}
              onTagChange={onTagsChange}
            />
          </Grid>
        </Grid>
        <NextButton />
      </form>
    );
  };

  return (
    <div>
      {step == 0 && <Step1 key="step-1" />}
      {step == 1 && <Step2 key="step-2" />}

      {step == 2 && <Step3 key="step-3" previousRecursion={cacheRecursion} />}

      <LocationPicker
        onChangeLocation={onChangeLocation}
        disableDistance={true}
      />
    </div>
  );
};
