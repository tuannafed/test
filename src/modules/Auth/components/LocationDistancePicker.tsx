import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  OutlinedInput,
  Slider,
  Stack,
  Typography
} from '@mui/material';
import React, { useState } from 'react';

import { LocationOn } from '@mui/icons-material';
import { categoryService } from 'common/api';
import { useAppDispatch } from 'common/hooks';
import { getToken } from 'common/localStorage';
import { LOCATION_PICKER } from 'constants/common';
import countriesZipCode from '../../../../public/countries/zipcode.json';
import { actionsAuth } from '../redux';
import { useSelectSignUp } from '../redux/select-hooks';
import { Location } from '../types';

interface LocationDistancePickerProps {
  location?: Location;
  code?: string;
  onClickClose?: (distance: number) => void;
  onChangeLocation: (data: any) => void;
}

export const LocationDistancePicker: React.FC<LocationDistancePickerProps> = ({
  code,
  onChangeLocation,
  onClickClose,
  ...props
}) => {
  const [addressState, setAddress] = useState<{
    addressStr: string;
    type: 'zipcode' | 'address';
  }>();
  const [location, setLocation] = useState<Location>();
  const [zipcode, setZipcode] = useState<string>(code || '');
  const [distance, setDistance] = useState<number>(30);
  const token = getToken();

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
            const parseLocation = getLocationAddress(locationData);
            setLocation(location);
            // console.log(location, address)
            onChangeLocation &&
              onChangeLocation({
                location: parseLocation.zip,
                coordinates: location,
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
            }
          });
      }
    }
    dispatch(actionsAuth.toggleLocationPicker());
    onClickClose && onClickClose(distance);
  };

  const onZipCodeChange = el => {
    setZipcode(el.target.value);
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
        }
      });

      setLocation({
        lat: location?.latitude,
        lng: location?.longitude
      });
      setAddress({
        addressStr: address,
        type: 'zipcode'
      });
    }
  };

  const onSlideChange = ({ target }) => {
    setDistance(target.value);
  };

  return (
    <Dialog
      open={isOpenLocationPicker}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h6">{LOCATION_PICKER.TITLE}</Typography>
      </DialogTitle>
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
              margin: '10px 0'
            }}
          >
            {LOCATION_PICKER.LOCATION_NAME}
          </Typography>
          <Button
            variant="outlined"
            color="success"
            startIcon={<LocationOn />}
            sx={{
              margin: '10px 0'
            }}
            onClick={getCurrentLocation}
          >
            {LOCATION_PICKER.LOCATION_BUTTON}
          </Button>
        </Box>

        <Typography textAlign="center" sx={{ margin: '20px 0' }}>
          Or
        </Typography>

        <Box textAlign="center">
          <OutlinedInput
            name="zipcode"
            placeholder="Zip code"
            type="number"
            value={zipcode}
            onChange={onZipCodeChange}
            sx={{ maxWidth: '160px' }}
          />
          <Typography fontWeight="bold" sx={{ margin: '16px' }}>
            {addressState?.addressStr}
          </Typography>
        </Box>
        <Divider />
        <Typography
          fontWeight="bold"
          sx={{ marginTop: '20px' }}
          textAlign="center"
        >
          Distance:{' '}
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ marginTop: '20px' }}>
          <span style={{ margin: '0px  10px  0px 0px' }}>{0}</span>
          <Slider
            key={`RHFSlider-picker`}
            min={1}
            max={100}
            onChange={onSlideChange}
            value={distance}
          />
          <span style={{ margin: '0px 0px 0px 10px' }}>{100}</span>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClickOk}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
