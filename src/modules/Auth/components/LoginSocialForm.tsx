import { SocialLoginFB, SocialLoginGoogle } from 'components';

import { authService } from 'common/api';
import { useAppDispatch } from 'common/hooks';
import { setToken } from 'common/localStorage';
import { AUTH_STATUS } from 'constants/common';
import { actionsAuth } from 'modules/Auth';
import { useSnackbar } from 'notistack';
import React from 'react';
import { redirect } from 'utils';

interface ILoginSocial {
  onSuccessLoginFacebook?: (user: any) => void;
  onSuccessLoginGoogle?: (user: any) => void;
  onFailLoginFacebook?: (error: any) => void;
  onFailLoginGoogle?: (error: any) => void;
}

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

export const LoginSocialForm: React.FC<ILoginSocial> = () => {
  const FB_ID = process.env.NEXT_PUBLIC_FB_APP_ID as string;
  const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID as string;

  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onFail = (error: any) => {
    console.log(error);
  };

  const signUp = socicalData => {
    authService
      .register({
        ...defaultState,
        ...socicalData
      })
      .then(({ data }) => {
        if (data.status == 2) {
          enqueueSnackbar(AUTH_STATUS.REGISTER_SUCCESS);
          setToken(data.token);
          redirect('/');

          return;
        }

        if (data.status == 0) {
          enqueueSnackbar(AUTH_STATUS.REGISTER_FAILED, { variant: 'error' });
        } else {
          enqueueSnackbar(AUTH_STATUS.REGISTER_SUCCESS);
          setToken(data.token);
          redirect('/', {
            firstlogin: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSuccessLoginFacebook = (user: any) => {
    const userData = user._profile;
    const tokenData = user._token;

    const postData = {
      type: 'facebook',
      email: userData.email,
      token: tokenData.accessToken
    };
    dispatch(actionsAuth.login(postData))
      .unwrap()
      .then(loginData => {
        const { status, data } = loginData;

        if (status === 0) {
          enqueueSnackbar(AUTH_STATUS.LOGIN_FAILED, { variant: 'error' });
        }

        if (status == 1) {
          setToken(data.token);
          redirect('/');
          enqueueSnackbar(AUTH_STATUS.LOGIN_SUCCESS);
        }

        if (status == 2) {
          // SIGN UP ACCOUNT
          signUp({
            firstname: userData.firstName,
            lastname: userData.lastName,
            email: userData.email,
            signup_from: 'facebook',
            'facebook.id': userData.id,
            'facebook.profile_picture': userData.profilePicURL,
            'facebook.token': tokenData.accessToken
          });
        }
      })
      .catch(err =>
        enqueueSnackbar(AUTH_STATUS.LOGIN_FAILED, { variant: 'error' })
      );
  };

  const onSuccessLoginGoogle = (user: any) => {
    // TODO: CHECK USER IF EXIST
    const userData = user._profile;
    const tokenData = user._token;

    const postData = {
      email: userData.email,
      type: 'google',
      token: tokenData.idToken
    };

    dispatch(actionsAuth.login(postData))
      .unwrap()
      .then(loginData => {
        const { status, data } = loginData;

        if (status === 0) {
          enqueueSnackbar(AUTH_STATUS.LOGIN_FAILED, { variant: 'error' });
        }

        if (status == 1) {
          setToken(data.token);
          redirect('/');
          enqueueSnackbar(AUTH_STATUS.LOGIN_SUCCESS);
        }

        if (status == 2) {
          // SIGN UP ACCOUNT
          signUp({
            firstname: userData.firstName,
            lastname: userData.lastName,
            email: userData.email,
            signup_from: 'google',
            'google.id': userData.id,
            'google.profile_picture': userData.profilePicURL,
            'google.token': tokenData.idToken,
            'google.expires_at': tokenData.expiresAt,
            'google.expires_in': tokenData.expiresIn
          });

          // TODO: API Sign Up
        }
      });
  };

  return (
    <>
      <SocialLoginFB
        provider="facebook"
        appId={FB_ID}
        onLoginSuccess={onSuccessLoginFacebook}
        onLoginFailure={onFail}
      >
        <div>Đăng nhập với Facebook</div>
      </SocialLoginFB>

      <SocialLoginGoogle
        provider="google"
        appId={GOOGLE_ID}
        onLoginSuccess={onSuccessLoginGoogle}
        onLoginFailure={onFail}
      >
        <div>Đăng nhập với Google</div>
      </SocialLoginGoogle>
    </>
  );
};
