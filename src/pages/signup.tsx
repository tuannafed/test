/* eslint-disable @next/next/no-img-element */
import { Container, Grid, Typography } from '@mui/material';

import { Layout } from 'components';
import { withAuth } from 'hoc';
import { SignUpForm } from 'modules/Auth';
import React from 'react';

const SignupPage: React.FC = () => {
  return (
    <Layout variant="blank" title="Tạo tài khoản mới">
      <div
        style={{
          backgroundImage: `url('/images/background1.jpg')`,
          backgroundColor: '#47487a',
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
          minHeight: '100vh'
        }}
      >
        <Container>
          <Grid
            // container
            // justifyContent="center"
            // alignItems="center"
            // flexDirection="column"
            // minHeight="20vh"
            style={{
              backgroundColor: '#fff',
              margin: '30px auto',
              borderRadius: '10px'
            }}
            item
            sm={8}
            md={5}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <img
              alt="logo"
              src="/images/logo-with-text.png"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                marginTop: '20px',
                width: '200px',
                cursor: 'pointer'
              }}
            />
            <Typography variant="body1" margin="10px" fontWeight="500">
              Đăng ký để kết nối với người Việt ở Mỹ
            </Typography>
            <Grid item sm={8} md={8} width="100%">
              <SignUpForm />
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};
export default withAuth(SignupPage);
