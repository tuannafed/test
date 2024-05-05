import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Theme,
  Typography
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { getDistance, getToken } from 'common/localStorage';
import React, { useEffect, useState } from 'react';

import { LocationOn } from '@mui/icons-material';
import { categoryService } from 'common/api';
import { useAppDispatch } from 'common/hooks';
import { LOCATION_PICKER } from 'constants/common';
import { useSnackbar } from 'notistack';
import countriesZipCode from '../../../../public/countries/zipcode.json';
import { actionsAuth } from '../redux';
import { useSelectSignUp } from '../redux/select-hooks';
import { Location } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      margin: theme.spacing(1),
      height: 38
    }
  })
);

interface LocationPickerProps {
  location?: Location;
  code?: string;
  onClickClose?: (distance) => void;
  onChangeLocation: (data: any) => void;
  disableDistance?: boolean;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  code,
  onChangeLocation,
  onClickClose,
  disableDistance,
  ...props
}) => {
  const classes = useStyles();
  const [distance, setDistance] = useState<number>(30);
  const [addressState, setAddress] = useState<{
    addressStr?: string;
    type: 'zipcode' | 'address';
  }>();

  const [zipcode, setZipcode] = useState<string>(code || '');
  const token = getToken();
  const { enqueueSnackbar } = useSnackbar();

  const getAdrress = (city: string, state: string) => {
    if (city) {
      return `${city}, ${state}`;
    } else {
      return `${state}`;
    }
  };

  const { isOpenLocationPicker } = useSelectSignUp();
  const dispatch = useAppDispatch();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const location: Location = {
          lat: latitude,
          lng: longitude
        };

        categoryService
          .getLocation(location, {
            Authorization: `Bearer ${token}`
          })
          .then(data => {
            const locationData = data.data.data;
            if (!locationData) return;

            const parseLocation = getLocationAddress(locationData);

            if (!parseLocation?.zip) return;
            onChangeLocation &&
              onChangeLocation({
                location: parseLocation.zip,
                coordinates: location,
                distance: distance,
                ...parseLocation
              });

            setAddress({
              addressStr: getAdrress(
                parseLocation.city,
                parseLocation.long_city
              ),
              type: 'address'
            });
            setZipcode(parseLocation.zip);
          });
      });
    }
  };

  const getLocationAddress = responseData => {
    const address = responseData?.formatted_address;
    let city, state, country, zip, long_city;
    if (responseData?.address_components) {
      responseData.address_components.forEach(address_component => {
        if (address_component.types[0] === 'administrative_area_level_2') {
          city = address_component.long_name;
        }
        if (address_component.types[0] === 'administrative_area_level_1') {
          state = address_component.short_name;
          long_city = address_component.long_name;
        }
        if (address_component.types[0] === 'country') {
          country = address_component.long_name;
        }
        if (address_component.types[0] === 'postal_code') {
          zip = address_component.long_name;
        }
      });
    }

    return {
      city,
      state,
      country,
      address,
      zip,
      long_city
    };
  };

  const onClickOk = () => {
    // CHECK NEN XAI LOCATION NAO
    if (addressState?.type == 'zipcode') {
      const location = countriesZipCode[zipcode];
      const address =
        location?.acceptable_cities + ', ' + location?.primary_city;
      if (location) {
        onChangeLocation &&
          onChangeLocation({
            location: zipcode,
            address: address,
            city: location?.primary_city,
            state: location?.state,
            zip: location?.zip,
            coordinates: {
              lat: location?.latitude,
              lng: location?.longitude
            },
            distance: distance
          });
      } else {
        enqueueSnackbar('Please enter a valid zip code', { variant: 'error' });
        return;
      }
    }
    dispatch(actionsAuth.toggleLocationPicker());
    onClickClose && onClickClose(distance);
  };

  const onZipCodeChange = el => {
    setZipcode(el.target.value);
    setAddress({
      type: 'zipcode'
    });
    const location = countriesZipCode[el.target.value];

    if (location) {
      const address = getAdrress(
        location?.acceptable_cities,
        location?.primary_city
      );
      onChangeLocation({
        location: zipcode,
        address: address,
        city: location.primary_city,
        state: location.state,
        zip: location?.zip,
        coordinates: {
          lat: location?.latitude,
          lng: location?.longitude
        },
        distance: distance
      });
      setAddress({
        addressStr: address,
        type: 'zipcode'
      });
    }
  };
  useEffect(() => {
    setDistance(getDistance());
  }, [distance]);

  const onSlideChange = (target: number) => {
    setDistance(target);
  };
  const getChipStatus = (distance, targetDistance) => {
    return distance == targetDistance ? 'filled' : 'outlined';
  };

  const handleCloseModal = () => {
    dispatch(actionsAuth.toggleLocationPicker());
  };

  return (
    <Dialog
      open={isOpenLocationPicker}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={handleCloseModal}
    >
      <DialogContent
        sx={{
          width: {
            sm: '100%',
            md: '400px'
          }
        }}
      >
        <Box textAlign="center">
          <Typography
            fontWeight="bold"
            sx={{
              margin: '5px 0'
            }}
          >
            {LOCATION_PICKER.LOCATION_NAME}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.input}
            startIcon={<LocationOn />}
            sx={{
              margin: '20px 0'
            }}
            onClick={getCurrentLocation}
          >
            {LOCATION_PICKER.LOCATION_BUTTON}
          </Button>
        </Box>

        <Typography
          textAlign="center"
          sx={{ margin: '5px 0' }}
          fontWeight="bold"
        >
          {LOCATION_PICKER.LOCATION_ZIPCODE}
        </Typography>

        <Box textAlign="center">
          <TextField
            InputProps={{
              className: classes.input
            }}
            focused
            variant="outlined"
            name="zipcode"
            placeholder="Zip code"
            type="number"
            color="primary"
            value={zipcode}
            onChange={onZipCodeChange}
            sx={{
              maxWidth: '160px',
              '& .MuiOutlinedInput-root': {
                color: '#47487a'
              },
              input: { textAlign: 'center' }
            }}
          />
          {addressState?.type == 'zipcode' &&
            zipcode.length == 5 &&
            addressState?.addressStr && (
              <Typography
                fontWeight="bold"
                sx={{ marginTop: '5px' }}
                color="primary"
              >
                {addressState?.addressStr}
              </Typography>
            )}

          {addressState?.type == 'address' && addressState?.addressStr && (
            <Typography
              fontWeight="bold"
              sx={{ marginTop: '5px' }}
              color="primary"
            >
              {addressState?.addressStr}
            </Typography>
          )}

          {addressState?.type == 'zipcode' && zipcode.length > 5 && (
            <Typography
              fontWeight="bold"
              sx={{ marginTop: '5px' }}
              color="orange"
            >
              Invalid Zipcode
            </Typography>
          )}
        </Box>
        {!disableDistance && (
          <>
            <Typography
              textAlign="center"
              sx={{ marginTop: '30px', marginBottom: '10px' }}
              fontWeight="bold"
            >
              {LOCATION_PICKER.LOCATION_DISTANCE}
            </Typography>
            <Box>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: 'center' }}
              >
                <Chip
                  clickable
                  variant={getChipStatus(distance, 5)}
                  label="5 Miles"
                  color="primary"
                  onClick={() => onSlideChange(5)}
                />
                <Chip
                  clickable
                  variant={getChipStatus(distance, 10)}
                  label="10 Miles"
                  color="primary"
                  onClick={() => onSlideChange(10)}
                />
                <Chip
                  clickable
                  variant={getChipStatus(distance, 20)}
                  label="20 Miles"
                  color="primary"
                  onClick={() => onSlideChange(20)}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{ marginTop: '5px', justifyContent: 'center' }}
              >
                <Chip
                  clickable
                  variant={getChipStatus(distance, 30)}
                  label="30 Miles"
                  color="primary"
                  onClick={() => onSlideChange(30)}
                />
                <Chip
                  clickable
                  variant={getChipStatus(distance, 50)}
                  label="50 Miles"
                  color="primary"
                  onClick={() => onSlideChange(50)}
                />
                <Chip
                  clickable
                  variant={getChipStatus(distance, 100)}
                  label="100 Miles"
                  color="primary"
                  onClick={() => onSlideChange(100)}
                />
              </Stack>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClickOk}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
