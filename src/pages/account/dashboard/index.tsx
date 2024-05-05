import * as React from 'react';
import { Grid } from '@mui/material';
import { Copyright } from '@mui/icons-material';
import { Layout } from 'components';
import { withAuth } from 'hoc';

const DashboardPage = () => {
  return (
    <Layout title="Dashboard" variant="auth">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <Paper
            sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
          ></Paper> */}
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Layout>
  );
};

export default withAuth(DashboardPage);
