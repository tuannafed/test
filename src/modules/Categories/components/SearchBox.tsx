import { LocationOn, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import {
  getDistance,
  getToken,
  getUserLocation,
  setDistance,
  setUserLocation
} from 'common/localStorage';
import { LocationPicker, actionsAuth } from 'modules/Auth';
import { actionsListing, useSelectFilterListing } from 'modules/Listings';
import React, { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { USER_LOCATION as defaultLocation } from 'constants/common';
import { useSelectAuthStore } from 'modules/Auth';
import { actionsUser } from 'modules/Users';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import countriesZipCode from '../../../../public/countries/zipcode.json';

export const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const isPathnameEmpty =
    (window.location.pathname as string) === '' ||
    (window.location.pathname as string) === '/';

  const filter = useSelectFilterListing();

  const name = filter.name || '';

  const { currentUser } = useSelectAuthStore();

  const retrieveUserLocation = getUserLocation();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const { query } = router;

  const city = currentUser._id
    ? currentUser.location?.city
    : retrieveUserLocation?.city || defaultLocation.location.city;

  const code = currentUser._id
    ? currentUser.location?.zipcode
    : retrieveUserLocation?.zipcode || defaultLocation.location.zipcode;

  const distance =
    currentUser.distance || getDistance() || defaultLocation.distance;

  const [cityState, setCity] = useState<string>(city);

  const [distanceState, setDistanceState] = useState<number>(distance);

  const [currentLocation, setCurrentLocation] = useState<any>({});

  const [searchData, setSearchData] = useState<string>('');

  const updateRoute = useCallback(
    (zipCode: string, _distance: string | number, _query: string) => {
      const url = window.location.origin + window.location.pathname;
      const location = countriesZipCode[zipCode as string];

      if (zipCode && _distance) {
        if (_query?.trim()) {
          router.replace(
            `${url}?distance=${_distance}&zip=${zipCode}&q=${_query}`
          );
        } else {
          router.replace(`${url}?distance=${_distance}&zip=${zipCode}`);
        }

        setDistanceState(Number.parseInt(_distance as string));

        setCity(location?.primary_city);
      }
    },
    [router]
  );

  useEffect(() => {
    const { zip, distance: _distance, q: _query } = query;
    if (zip && _distance) {
      updateRoute(zip as string, _distance as string, _query as string);
    } else {
      updateRoute(code, distance, _query as string);
    }
    if (isPathnameEmpty) {
      const newFilter = { ...filter };
      if (newFilter?.name) {
        delete newFilter.name;
      }
      setSearchData('');
      dispatch(
        actionsListing.setFilter({
          ...newFilter
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!filter.name) {
      setSearchData('');
      return;
    } else {
      if (!searchData) {
        setSearchData(filter.name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.name]);

  useEffect(() => {
    try {
      const { zip, distance: _distance } = query;

      if (zip && _distance) {
        const distanceNumber = Number.parseInt(_distance as string);

        const location = countriesZipCode[zip as string];

        const address =
          location?.acceptable_cities + ', ' + location?.primary_city;

        setCity(location?.primary_city);

        setUserLocation({
          type: 'Point',
          coordinates: [location?.latitude, location?.longitude],
          zipcode: zip,
          shortcode: location?.state,
          city: location?.primary_city,
          address: address,
          distance: distanceNumber
        });

        setDistance(distanceNumber);

        setDistanceState(distanceNumber);
      }
    } catch (err) {
      // console.log(err);
    }
  }, [query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const handleSearch = () => {
    if (!searchData?.trim()) {
      enqueueSnackbar('Không có từ khóa nào ở ô tìm kiếm', {
        variant: 'error'
      });
      return;
    }
    if (isPathnameEmpty) {
      if (searchData?.trim()) {
        router.push({
          pathname: '/search',
          query: {
            q: searchData.trim()
          }
        });
      }
      return;
    }
    dispatch(
      actionsListing.setFilter({
        ...filter,
        name: searchData
      })
    );
    const { zip: zipCode, distance: _distance } = query;
    if (zipCode && _distance) {
      updateRoute(zipCode as string, _distance as string, searchData);
    } else {
      updateRoute(code, distance, searchData as string);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickSearch = (e: any) => {
    handleSearch();
  };

  const onChangeLocation = locationData => {
    const location = locationData?.coordinates || [0, 0];

    const zip = locationData.zip;

    const _distance = locationData.distance;

    const postUserData = {
      location: {
        type: 'Point',
        coordinates: [location.lat, location.lng],
        zipcode: zip,
        shortcode: locationData.state,
        city: locationData.city,
        address: locationData.address,
        distance: _distance
      }
    };

    setCurrentLocation(postUserData);

    if (currentUser._id) {
      sendUpdateLocation(_distance, postUserData.location);
    } else {
      changeLocation(_distance, postUserData.location);
    }
  };

  const handlePickLocation = () => {
    dispatch(actionsAuth.toggleLocationPicker());
  };

  // LOCATION
  const changeLocation = (_distance, _location: any) => {
    dispatch(
      actionsListing.setFilter({
        ...filter,
        'location[type]': 'Point',
        'location[coordinates][1]':
          _location?.coordinates[0] ||
          currentLocation?.location?.coordinates[0] ||
          defaultLocation.location.coordinates[1],
        'location[coordinates][0]':
          _location?.coordinates[1] ||
          currentLocation?.location?.coordinates[1] ||
          defaultLocation.location.coordinates[0],
        distance: _distance || defaultLocation.distance || Number.MAX_VALUE
      })
    );

    setUserLocation(
      _location || currentLocation?.location || currentUser.location
    );

    const zipCode =
      _location?.zipcode ||
      currentLocation?.location?.zipcode ||
      currentUser.location?.zipcode;

    setDistance(_distance);

    setDistanceState(_distance);

    updateRoute(zipCode, _distance, name);
  };

  const sendUpdateLocation = (_distance: number, _location: any) => {
    dispatch(
      actionsUser.updateUser({
        userId: currentUser._id,
        data: {
          ..._location,
          _distance
        },
        token: getToken()
      })
    )
      .unwrap()
      .then(res => {
        dispatch(
          actionsAuth.setCurrentUser({
            ...currentUser,
            location: { ..._location },
            distance: _distance
          })
        );
        changeLocation(_distance, _location);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const handleLocationPick = (_distance: number) => {
    const location = currentUser?._id
      ? {
          ...currentUser.location,
          distance: _distance
        }
      : {
          ...retrieveUserLocation,
          distance: _distance
        };
    if (!currentLocation?.location) {
      setCurrentLocation({
        location
      });
    }

    if (currentUser._id) {
      sendUpdateLocation(_distance, location);
    } else {
      changeLocation(_distance, location);
    }

    const zipCode = location?.zipcode;

    updateRoute(zipCode, _distance, name);
  };
  return (
    <Box>
      <TextField
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            color: '#47487a'
          }
        }}
        className="search-box"
        name="search"
        value={searchData}
        focused
        placeholder="Tìm kiếm tất cả"
        color="primary"
        onChange={onChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickSearch}>
                <Search color="primary" />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            borderRadius: '25px'
          }
        }}
      />
      <Button
        startIcon={<LocationOn />}
        onClick={handlePickLocation}
        sx={{
          ml: 1,
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'transparent'
          }
        }}
        color="primary"
      >
        {`${cityState}: Bán kính ${distanceState} miles`}
      </Button>
      <LocationPicker
        code={code}
        onChangeLocation={onChangeLocation}
        onClickClose={handleLocationPick}
      />
    </Box>
  );
};
