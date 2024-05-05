import { BUTTON, USER_PAGE_PROFILE, USER_STATUS } from 'constants/common';
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  FormGroup,
  Grid,
  InputLabel,
  Stack,
  Typography
} from '@mui/material';
import { LocationPicker, actionsAuth } from 'modules/Auth';
import { IUser, actionsUser, schemaValidateUpdateUser } from 'modules/Users';
import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LocationOn } from '@mui/icons-material';
import { useAppDispatch } from 'common/hooks';
import { getToken } from 'common/localStorage';
import { RHFTextInput } from 'components';
import { isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

interface ProfileFormProps {
  user: IUser;
}

export const UserProfile: React.FC<ProfileFormProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading] = useState(false);
  const [userState, setUser] = useState<IUser>(user);
  const zipwrap = userState.location?.zipcode || '';
  const [zipcode, setZip] = useState<string>(zipwrap);

  const { control, handleSubmit } = useForm<IUser>({
    defaultValues: user,
    resolver: yupResolver(schemaValidateUpdateUser)
  });

  /**
   * onSubmit
   * @param data
   * @returns void
   */

  const onSubmit = async (data: any) => {
    if (isEmpty(data)) return;
    const token = getToken();
    const postData = {
      ...userState,
      ...data,
      distance: userState.distance,
      location: {
        ...userState.location,
        zipcode: zipcode + ''
      }
    };

    await dispatch(
      actionsUser.updateUser({
        token: token,
        data: postData,
        userId: userState._id
      })
    )
      .unwrap()
      .then(res => {
        if (!res.data) return;
        enqueueSnackbar(USER_STATUS.UPDATE_USER_SUCCESS);
        // dispatch(actionsAuth.setCurrentUser(postData));
      })
      .catch(() => {
        enqueueSnackbar(USER_STATUS.UPDATE_USER_FAILED, { variant: 'error' });
      });
  };

  const handlePickLocation = () => {
    dispatch(actionsAuth.toggleLocationPicker());
  };

  const onChangeLocation = locationData => {
    const location = locationData?.coordinates;
    const zip = locationData.zip;
    const postUserData = {
      ...userState,
      location: {
        type: 'Point',
        coordinates: [location.lat, location.lng],
        zipcode: zip,
        shortcode: locationData.state,
        city: locationData.city,
        address: locationData.address
      }
    };
    setUser(postUserData);
    setZip(zip);
  };

  const onClickOk = distance => {
    const postUserData = {
      ...userState,
      distance
    };
    setUser(postUserData);
  };

  return (
    <Grid container justifyContent="center" mt={5}>
      <Grid item xs={12} sm={10} md={8}>
        <Typography
          color="primary"
          component="h1"
          variant="h5"
          align="center"
          mb={4}
        >
          {USER_PAGE_PROFILE.PAGE_ACCOUNT}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormGroup>
                <InputLabel htmlFor="first_name">
                  {' '}
                  {USER_PAGE_PROFILE.FIRST_NAME}
                </InputLabel>
                <RHFTextInput
                  size="small"
                  id="firstname"
                  name="firstname"
                  variant="outlined"
                  placeholder={USER_PAGE_PROFILE.ENTER_FIRST_NAME}
                  control={control}
                  fullWidth
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                <InputLabel htmlFor="last_name">
                  {USER_PAGE_PROFILE.LAST_NAME}
                </InputLabel>
                <RHFTextInput
                  size="small"
                  id="lastname"
                  name="lastname"
                  variant="outlined"
                  placeholder={USER_PAGE_PROFILE.ENTER_LAST_NAME}
                  control={control}
                  fullWidth
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <InputLabel htmlFor="email">Email</InputLabel>
                <RHFTextInput
                  size="small"
                  id="email"
                  name="email"
                  variant="outlined"
                  placeholder={USER_PAGE_PROFILE.ENTER_EMAIL}
                  control={control}
                  fullWidth
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <InputLabel htmlFor="password">
                  {USER_PAGE_PROFILE.PASSWORD}
                </InputLabel>
                <RHFTextInput
                  size="small"
                  id="password"
                  name="password"
                  variant="outlined"
                  placeholder={USER_PAGE_PROFILE.ENTER_PASSWORD}
                  type="password"
                  control={control}
                  fullWidth
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <FormGroup>
                <InputLabel htmlFor="passwordConfirm">
                  {USER_PAGE_PROFILE.RE_PASSWORD}
                </InputLabel>
                <RHFTextInput
                  size="small"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  variant="outlined"
                  placeholder={USER_PAGE_PROFILE.RE_PASSWORD}
                  type="password"
                  control={control}
                  fullWidth
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              {/* <FormGroup>
                    <ListItem 
                        alignItems="flex-start" 
                        sx={{
                            margin: '10px 0', 
                            padding: '0px',
                            width: '100%',
                            height: '60px',
                            ':hover': {
                                cursor: 'pointer'
                            }
                        }}
                        onClick={handlePickLocation}
                    >
                            <ListItemText
                            primary="Location"
                            secondary={address}
                            >
                            </ListItemText>
                    </ListItem>
                  </FormGroup> */}

              <FormGroup>
                <InputLabel>{USER_PAGE_PROFILE.LOCATION}</InputLabel>
                <Button
                  startIcon={<LocationOn />}
                  onClick={handlePickLocation}
                  sx={{
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: 'transparent'
                    }
                  }}
                  color="primary"
                >
                  {`${userState?.location?.city}: Bán kính ${userState?.distance} Miles`}
                </Button>
                <LocationPicker
                  code={user.location?.zipcode}
                  onChangeLocation={onChangeLocation}
                  onClickClose={onClickOk}
                />
              </FormGroup>
            </Grid>

            {/* <Grid item xs={12}>
                  <FormGroup>
                    <InputLabel htmlFor="distance" sx={{mb: '10px'}}>
                      Distance
                    </InputLabel>
                    <RHFSlider 
                        control={control}
                        name="distance"
                        id='distance'
                        label="Distance"
                        inputLabels={["0 Mile", "100 Miles"]}
                      />
                  </FormGroup>
              </Grid> */}

            <Grid item xs={12} display="flex" justifyContent="center" mt={4}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: 'cener' }}
              >
                <Button type="button" color="inherit" variant="contained">
                  {BUTTON.CANCEL}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isLoading}
                >
                  {BUTTON.UPDATE}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
