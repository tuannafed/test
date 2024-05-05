import React from 'react';
import SocialLogin from 'react-social-login';
import {
  FacebookLoginButton,
  GoogleLoginButton
} from 'react-social-login-buttons';

interface SocialLoginProps {
  provider: 'facebook' | 'google';
  appId: String;
  onLoginSuccess?: (user: any) => void;
  onLoginFailure?: (error: any) => void;
  triggerLogin?: () => void;
  getInstance?: () => any;
  scope?: [string];
  children: React.ReactNode;
  props: any;
}

const buttonStyle = {
  margin: 0,
  width: '100%',
  marginTop: '10px'
};

const SocialFacebookButton: React.FC<SocialLoginProps> = data => {
  const { triggerLogin, children, props } = data;
  return (
    <FacebookLoginButton
      onClick={triggerLogin}
      {...props}
      align="center"
      style={buttonStyle}
      text="Đăng nhập với Facebook"
    >
      {children}
    </FacebookLoginButton>
  );
};

const SocialGoogleButton: React.FC<SocialLoginProps> = data => {
  const { triggerLogin, children, props } = data;
  return (
    <GoogleLoginButton
      onClick={triggerLogin}
      {...props}
      align="center"
      text="Đăng nhập với Google"
      style={{
        ...buttonStyle,
        background: '#f1f2f6'
      }}
    >
      {children}
    </GoogleLoginButton>
  );
};

// TODO: Socal Login Pluggin Currently Not Working!
export const SocialLoginFB = SocialLogin(SocialFacebookButton);
export const SocialLoginGoogle = SocialLogin(SocialGoogleButton);

// export const SocialLoginFB = SocialFacebookButton
// export const SocialLoginGoogle = SocialGoogleButton
