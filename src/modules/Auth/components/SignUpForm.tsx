import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  Grid,
  InputLabel,
  Typography
} from '@mui/material';
import { AUTH_STATUS, BUTTON, USER_PAGE_PROFILE } from 'constants/common';
import React, { useState } from 'react';
import { redirect, stackCallback } from 'utils';

import { yupResolver } from '@hookform/resolvers/yup';
import { LocationOn } from '@mui/icons-material';
import { authService } from 'common/api';
import { useAppDispatch } from 'common/hooks';
import { setToken } from 'common/localStorage';
import { RHFTextInput } from 'components';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { parseLocation } from 'utils';
import { actionsAuth } from '../redux';
import { useSelectSignUp } from '../redux/select-hooks';
import { schemaValidateSignUp } from '../schema';
import { IRegisterForm } from '../types';
import { LocationPicker } from './LocationPicker';
import { SignUpStepper } from './SignUpStepper';

const defaultState = {
  email: '',
  password: '',
  passwordConfirm: '',
  firstname: '',
  lastname: '',
  location: {
    type: 'Point',
    coordinates: [0, 0],
    zipcode: '',
    shortcode: '',
    city: '',
    address: ''
  },
  distance: 1,
  signup_from: 'email'
};

const cacheDistance = 20;

const MAX_SLIDER = 100;
const MIN_SLIDER = 1;

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { signUpStep } = useSelectSignUp();
  const [user, setUser] = useState(defaultState);
  const [address, setAddress] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [distance, setDistance] = useState(cacheDistance);
  const { query } = useRouter();
  console.log(query);

  // useEffect(() => {
  //     const socialUserData = parseRouteQueryToObject(query);
  //     setUser({
  //         ...user,
  //         ...socialUserData
  //     })
  //     const userData = {
  //             ...user,
  //             ...socialUserData
  //     }
  //     authService.register(userData)

  // }, [query])

  const setToStep = (step: number) => {
    dispatch(actionsAuth.setStep(step));
  };

  const Step1 = () => {
    const { control, handleSubmit } = useForm<IRegisterForm>({
      defaultValues: user,
      resolver: yupResolver(schemaValidateSignUp)
    });
    const onCancel = () => {
      redirect('/');
    };
    const onSubmitStep1 = data => {
      setUser({
        ...data
      });

      setToStep(1);
    };

    const NextButton = () => {
      return (
        <Box justifyContent="center" display="flex">
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ margin: '0 20px' }}
          >
            {BUTTON.CANCEL}
          </Button>
          <Button variant="contained" sx={{ margin: '0 20px' }} type="submit">
            {BUTTON.NEXT}
          </Button>
        </Box>
      );
    };

    return (
      <Box>
        <form onSubmit={handleSubmit(onSubmitStep1)} autoComplete="on">
          <Grid container spacing={2} mt={2} mb={6}>
            <Grid item xs={12}>
              <FormGroup>
                <InputLabel htmlFor="signup_email">Email</InputLabel>
                <RHFTextInput
                  id="signup_email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  placeholder={USER_PAGE_PROFILE.ENTER_EMAIL}
                  control={control}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <InputLabel htmlFor="signup_firstname">
                  {USER_PAGE_PROFILE.FIRST_NAME}
                </InputLabel>
                <RHFTextInput
                  id="signup_firstname"
                  name="firstname"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder={USER_PAGE_PROFILE.ENTER_FIRST_NAME}
                  control={control}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <InputLabel htmlFor="signup_lastname">
                  {USER_PAGE_PROFILE.LAST_NAME}
                </InputLabel>
                <RHFTextInput
                  id="signup_lastname"
                  name="lastname"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder={USER_PAGE_PROFILE.ENTER_LAST_NAME}
                  control={control}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <InputLabel htmlFor="signup_passsword">
                  {USER_PAGE_PROFILE.PASSWORD}
                </InputLabel>
                <RHFTextInput
                  id="signup_passsword"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  placeholder={USER_PAGE_PROFILE.ENTER_PASSWORD}
                  control={control}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <InputLabel htmlFor="signup_repasssword">
                  {USER_PAGE_PROFILE.RE_PASSWORD}
                </InputLabel>
                <RHFTextInput
                  id="signup_repasssword"
                  name="passwordConfirm"
                  type="password"
                  variant="outlined"
                  fullWidth
                  placeholder={USER_PAGE_PROFILE.ENTER_RE_PASSWORD}
                  control={control}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <NextButton />
        </form>
      </Box>
    );
  };

  const onChangeLocation = locationData => {
    const location = locationData?.coordinates;
    const zip = locationData.zip;

    setUser({
      ...user,
      location: {
        type: 'Point',
        coordinates: [location.lat, location.lng],
        zipcode: zip,
        shortcode: locationData.state,
        city: locationData.city,
        address: locationData.address
      }
    });

    stackCallback(() => {
      const address = parseLocation(user.location);
      setAddress(locationData.city);
    }, 500);
  };

  const onClickOk = distance => {
    setDistance(distance);
  };

  const Step2 = ({ address: string }) => {
    const handlePickLocation = () => {
      dispatch(actionsAuth.toggleLocationPicker());
    };

    const onClickNext = () => {
      const userData = {
        ...user,
        distance
      };
      authService
        .register(userData)
        .then(({ data }) => {
          if (data.status == 2) {
            enqueueSnackbar(AUTH_STATUS.USER_EXIST, { variant: 'error' });
            setToStep(0);
            return;
          }

          if (data.status == 0) {
            enqueueSnackbar(AUTH_STATUS.REGISTER_FAILED, { variant: 'error' });
          } else {
            enqueueSnackbar(AUTH_STATUS.REGISTER_SUCCESS);
            setToStep(2);
            setToken(data.token);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const NextButton = () => {
      return (
        <Box justifyContent="center" display="flex">
          <Button
            variant="outlined"
            sx={{ margin: '0 20px' }}
            onClick={() => setToStep(0)}
          >
            {BUTTON.PREVIEW}
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '0 20px' }}
            onClick={onClickNext}
            disabled={
              user?.location.coordinates[0] === 0 &&
              user?.location.coordinates[1] === 0
            }
          >
            {BUTTON.NEXT}
          </Button>
        </Box>
      );
    };

    return (
      <Box>
        <Button
          color="primary"
          onClick={handlePickLocation}
          sx={{
            width: '100%',
            marginTop: '0 20px',
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent'
            }
          }}
        >
          Chọn vị trí mới của bạn
        </Button>
        <FormGroup>
          <Button
            color="primary"
            startIcon={<LocationOn />}
            onClick={handlePickLocation}
            sx={{
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'transparent'
              }
            }}
          >
            {`${address}: Bán kính ${distance} miles`}
          </Button>
        </FormGroup>
        <NextButton />
      </Box>
    );
  };

  const Step3 = () => {
    const onFinish = () => {
      redirect('/');
    };

    const NextButton = () => {
      return (
        <Box justifyContent="center" display="flex">
          {/* <Button 
                        variant="outlined" 
                        sx = {{margin: "0 20px"}}
                        onClick={() => setToStep(1)}
                    >
                        Previous Step
                    </Button>
                    <Button variant="contained" sx = {{margin: "0 20px"}} 
                        onClick = {onFinish}
                    >Finish
                    </Button> */}
          <Button
            variant="contained"
            sx={{ margin: '0 20px' }}
            onClick={onFinish}
          >
            {BUTTON.SUCCESS_BUTTON}
          </Button>
        </Box>
      );
    };

    return (
      <Box>
        <Typography textAlign="center" sx={{ margin: '40px 0' }} variant="h6">
          {BUTTON.SUCCESS_BUTTON_REGISTER}
        </Typography>
        <NextButton />
      </Box>
    );
  };

  return (
    <Card>
      <CardContent>
        <SignUpStepper />

        {signUpStep == 0 && <Step1 />}

        {signUpStep == 1 && <Step2 address={address} />}

        {signUpStep == 2 && <Step3 />}

        <LocationPicker
          onChangeLocation={onChangeLocation}
          onClickClose={onClickOk}
        />
      </CardContent>
    </Card>
  );
};
