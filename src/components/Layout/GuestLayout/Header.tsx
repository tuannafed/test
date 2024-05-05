/* eslint-disable @next/next/no-img-element */
import { AddCircleOutlined, Person } from '@mui/icons-material';
import { AppBar, Box, Button, Container, Stack, Toolbar } from '@mui/material';
import { redirect, stackCallback } from 'utils';

import { Navbar } from 'components';
import { actionsListing } from 'modules/Listings';
import Link from 'next/link';
import { AccountMenu } from './AccountMenu';
import { MenuSP } from './MenuSP';
// import { useRouter } from 'next/router';
import { publicMenu } from '@mockData/menu';
import { useSelectAuthStore } from 'modules/Auth';
import { useDispatch } from 'react-redux';

export const Header = () => {
  // const { route } = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelectAuthStore();

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        boxShadow: ' 0px 1px 0px #E2E2E2',
        marginBottom: { xs: 3, sm: 5 }
      }}
    >
      <Container>
        <Toolbar
          disableGutters={true}
          sx={{
            height: '68px'
          }}
        >
          <MenuSP />
          <Box display="flex" alignItems="center">
            <Box mt="8px"></Box>
            <Link href="/">
              <img
                alt="logo"
                src="/images/logo-with-text.png"
                style={{
                  display: 'inline-block',
                  maxWidth: '100%',
                  width: '200px',
                  cursor: 'pointer'
                }}
              />
              {/* <Typography
                component="h1"
                variant="h4"
                color="primary"
                sx={{
                  fontSize: width && width < 420 ? '20px ' : undefined,
                  fontFamily: '"Montserrat", "Roboto", "Arial", sans-serif',
                  ":hover": {
                    cursor: "pointer"
                  }
                }}
              > 
                {process.env.NEXT_PUBLIC_SITENAME}
              </Typography> */}
            </Link>
          </Box>
          <Box
            display={{ xs: 'none', md: 'block' }}
            ml={{ md: 4, lg: 10, xl: 12 }}
          >
            <Navbar data={publicMenu} />
          </Box>
          <Box ml={{ md: 'auto', xs: 'auto' }}>
            <Stack direction="row" ml={2}>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  dispatch(actionsListing.setStep(0));
                  stackCallback(() => redirect('/listings/create'));
                }}
                endIcon={<AddCircleOutlined />}
                sx={{
                  '& span.MuiButton-endIcon': {
                    marginLeft: '0'
                  },
                  minWidth: {
                    md: '64px',
                    sm: '0px'
                  }
                }}
              >
                <span className="btn-create-raovat">Đăng rao vặt miễn phí</span>
              </Button>
              {Object.keys(currentUser).length == 0 ? (
                <Button
                  variant="contained"
                  endIcon={<Person />}
                  onClick={() => {
                    redirect('/login');
                  }}
                  sx={{
                    ml: '20px',
                    '& span.MuiButton-endIcon': {
                      marginLeft: '0'
                    },
                    minWidth: {
                      md: '64px',
                      sm: '0px'
                    }
                  }}
                >
                  <span className="btn-create-raovat">Đăng nhập</span>
                </Button>
              ) : (
                <AccountMenu />
              )}
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
