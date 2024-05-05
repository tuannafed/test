import { Container, Grid, Typography } from '@mui/material';
import { LoginForm, LoginSocialForm } from 'modules/Auth';

import { Layout } from 'components';
import { withAuth } from 'hoc';
import Link from 'next/link';
import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <Layout variant="blank" title="Đăng nhập tài khoản">
      <div
        style={{
          backgroundImage: `url('/images/background1.jpg')`,
          backgroundColor: '#47487a',
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
          height: '100vh'
        }}
      >
        <Container>
          <Grid
            // container
            // justifyContent="center"
            // alignItems="center"
            // flexDirection="column"
            // minHeight="auto"
            style={{
              backgroundColor: '#fff',
              margin: '90px auto',
              padding: '30px 20px',
              borderRadius: '10px'
            }}
            item
            sm={8}
            md={5}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <LoginForm />

            <Grid width="100%">
              <Typography mt={1} color="GrayText" textAlign="center">
                {'Chưa có tài khoản ? '}
                <Link href="/signup"> Đăng ký</Link>
              </Typography>
            </Grid>

            <Typography mt={2} variant="h6" color="GrayText">
              hoặc
            </Typography>

            <Grid width="100%">
              <LoginSocialForm />
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export default withAuth(LoginPage);
