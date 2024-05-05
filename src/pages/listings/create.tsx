import { Container, Grid } from '@mui/material';
import {
  CreateForm,
  CreateStepper,
  useSelectCreateListing
} from 'modules/Listings';

import { Layout } from 'components';
import { withAuth } from 'hoc';
import React from 'react';

export const CreatePage: React.FC = () => {
  const { step } = useSelectCreateListing();

  return (
    <Layout title="Tạo tin mới">
      <Container>
        <Grid container>
          <Grid item xs={12} md={8}>
            <CreateStepper step={step} />
            <div style={{ marginTop: '40px' }}>
              <CreateForm />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default withAuth(CreatePage);
