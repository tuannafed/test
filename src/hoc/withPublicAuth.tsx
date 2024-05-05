import { actionsAuth, useSelectAuthStore } from 'modules/Auth';
/* eslint-disable react/display-name */
import {
  getDistance,
  getToken,
  getUserLocation,
  removeToken,
  setDistance
} from 'common/localStorage';
import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { USER_LOCATION } from 'constants/common';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { redirect } from 'utils';
import countriesZipCode from '../../public/countries/zipcode.json';

// const PATH_EXCLUDED_AUTHENTICATION = ['/login', '/signup'];
global.globalLocation = {};

const withPublicAuth = WrappedComponent => {
  return props => {
    const { pathname } = useRouter();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [verified, setVerified] = useState<boolean>(false);
    const { query } = useRouter();

    // TODO: Can't get user info. Check auth.user in redux where come from?
    const { currentUser } = useSelectAuthStore();

    const getRouterParams = () => {
      let queryRouteFilter = {};
      try {
        const { zip, distance } = query;
        const location = countriesZipCode[zip as string];
        if (location) {
          queryRouteFilter = {
            'location[type]': 'Point',
            'location[coordinates][0]': location?.longitude,
            'location[coordinates][1]': location?.latitude,
            distance: +(distance as string)
          };
        }
      } catch (err) {
        console.log(err);
      }

      return queryRouteFilter;
    };

    /**
     * getCurrentUserAfterLogin
     * @param token
     * @returns
     */

    const getCurrentUserAfterLogin = useCallback(
      token => {
        if (!isEmpty(currentUser)) {
          return setVerified(true);
        }
        // Call getCurrentUser API
        dispatch(actionsAuth.getCurrentUser(token))
          .unwrap()
          .then(res => {
            if (isEmpty(res?.data)) return;
            const user = res.data;
            dispatch(actionsAuth.setCurrentUser(res.data));

            global.globalLocation = {
              'location[type]': 'Point',
              'location[coordinates][0]': user?.location?.coordinates?.[1] || 0,
              'location[coordinates][1]': user?.location?.coordinates?.[0] || 0,
              distance: user.distance || Number.MAX_VALUE,
              ...getRouterParams()
            };

            setDistance(global?.globalLocation?.distance || 0);

            return setVerified(true);
          })
          .catch(err => {
            // TODO: Maybe
            enqueueSnackbar('Error, Token expired!', { variant: 'error' });
            removeToken();
            redirect('/login');
          });
      },
      [dispatch, currentUser, enqueueSnackbar]
    );

    useEffect(() => {
      (async () => {
        const accessToken = await getToken();
        //const isExist = PATH_EXCLUDED_AUTHENTICATION.includes(pathname);

        // if no accessToken was found,then we redirect to "/" page.
        if (!accessToken) {
          const location = getUserLocation() || USER_LOCATION.location;
          const distance = getDistance();

          global.globalLocation = {
            'location[type]': 'Point',
            'location[coordinates][0]': location?.coordinates?.[1] || 0,
            'location[coordinates][1]': location?.coordinates?.[0] || 0,
            distance: distance || USER_LOCATION.distance || Number.MAX_VALUE,
            ...getRouterParams()
          };
          setDistance(global?.globalLocation?.distance || 0);

          setVerified(true);
        } else {
          // if (isExist) return redirect('/account/quiz');
          getCurrentUserAfterLogin(accessToken);
        }
      })();
    }, [pathname, getCurrentUserAfterLogin]);

    /**
     * Return
     */
    if (!verified) return null;
    return <WrappedComponent {...props} />;
  };
};

export default withPublicAuth;
