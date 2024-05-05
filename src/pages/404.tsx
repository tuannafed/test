/* eslint-disable @next/next/no-img-element */
import { Box, Button, Container, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Layout } from 'components';
import NextLink from 'next/link';

const Page404 = () => (
  <Layout variant="blank" title="404 | Page Not Found">
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography align="center" color="textPrimary" variant="h1">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src="/images/404.svg"
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560
              }}
            />
          </Box>
          <NextLink href="/" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Go back to homepage
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  </Layout>
);

export default Page404;
