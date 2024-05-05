// import { useAppDispatch } from 'common/hooks';
// import {getToken} from "common/localStorage"
// import {showConfirm, showSuccess} from "common/swalAlert"
// import {redirect} from "utils"
// import {useSelectAuthStore} from "modules/Auth"
import { Container, Grid } from '@mui/material';
import {
  CreateForm,
  CreateStepper,
  IListingDetail,
  useSelectCreateListing
} from 'modules/Listings';
import React, { useEffect, useState } from 'react';

import { listingService } from 'common/api';
import { Layout } from 'components';
import { withAuth } from 'hoc';

export const EditPage: React.FC = () => {
  // const dispatch = useAppDispatch();
  const { step, data } = useSelectCreateListing();
  const [listing, setListing] = useState<IListingDetail>(data.data);

  useEffect(() => {
    if (data.data) {
      listingService.getDetailBySlug(data.data.slug).then(res => {
        const listingData = res.data.data;
        setListing(listingData);
      });
    }
  }, []);

  return (
    <Layout title="Create Listing">
      <Container>
        <Grid>
          <Grid item xs={8}>
            <CreateStepper step={step} />
            <CreateForm listing={listing} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default withAuth(EditPage);
