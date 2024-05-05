import { actionsAuth, useSelectAuthStore } from 'modules/Auth';
/* eslint-disable react/display-name */
import { getToken, removeToken } from 'common/localStorage';
import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { redirect } from 'utils';

const PATH_EXCLUDED_AUTHENTICATION = ['/login', '/signup'];

const withAuth = WrappedComponent => {
  return props => {
    const { pathname } = useRouter();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [verified, setVerified] = useState<boolean>(false);

    // TODO: Can't get user info. Check auth.user in redux where come from?
    const { currentUser } = useSelectAuthStore();
    /**
     * getCurrentUserAfterLogin
     * @param token
     * @returns
     */

    const getCurrentUserAfterLogin = useCallback(
      token => {
        if (!isEmpty(currentUser)) return setVerified(true);
        // Call getCurrentUser API
        dispatch(actionsAuth.getCurrentUser(token))
          .unwrap()
          .then(res => {
            if (isEmpty(res?.data)) return;
            dispatch(actionsAuth.setCurrentUser(res.data));
            return setVerified(true);
          })
          .catch(err => {
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

        const isExist = PATH_EXCLUDED_AUTHENTICATION.includes(pathname);

        // if no accessToken was found,then we redirect to "/" page.
        if (!accessToken) {
          if (isExist) {
            setVerified(true);
          } else {
            redirect('/login');
          }
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

export default withAuth;
