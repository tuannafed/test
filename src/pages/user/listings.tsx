import { Container, Grid, Paper } from '@mui/material';
import { EnhanceModal, Layout } from 'components';
import {
  EditableListingList,
  ManageTab,
  ManageTabType,
  actionsListing
} from 'modules/Listings';
import React, { useEffect, useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { AuthMenu } from 'components';
import { MODAL } from 'constants/common';
import { withAuth } from 'hoc';
import { useSelectAuthStore } from 'modules/Auth';

const QUERY = {
  all: {
    hidden: false
  },
  expired: {
    expired: true
  },
  hidden: {
    hidden: true
  }
};

export const ManageListingPage: React.FC = () => {
  const { currentUser } = useSelectAuthStore();
  const dispatch = useAppDispatch();
  // const filterListings = useSelectFilterListing();
  const [type, setType] = useState<ManageTabType>('all');

  const onHandleTabChange = (type: ManageTabType) => {
    dispatch(
      actionsListing.setFilter({
        userId: currentUser._id,
        create_by: currentUser._id,
        ...QUERY[type]
      })
    );
    setType(type);
  };

  useEffect(() => {
    dispatch(
      actionsListing.setFilter({
        userId: currentUser._id,
        create_by: currentUser._id,
        ...QUERY['all']
      })
    );

    return () => {
      dispatch(actionsListing.setFilter({}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Quản lý danh sách">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <AuthMenu
              containerStyle={{
                display: {
                  xs: 'none',
                  md: 'block'
                }
              }}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper sx={{ padding: '20px' }}>
              <ManageTab onHandleChange={onHandleTabChange} />
              <Grid xs={12}>
                <EditableListingList variant={type} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <EnhanceModal
          title="Remove User"
          open={false}
          // onCancel={hide => setShowModal(hide)}
          // onOk={() => handleRemoveUser()}
          okText="Remove"
          cancelText="Cancel"
          variant="error"
        >
          {MODAL.CONTENT_MODAL_USER_REMOVE}
        </EnhanceModal>
      </Container>
    </Layout>
  );
};

export default withAuth(ManageListingPage);
