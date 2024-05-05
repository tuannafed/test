import { Container, Grid, Paper } from '@mui/material';
// import { useAppDispatch } from 'common/hooks';
// import { getToken } from 'common/localStorage';
import { EnhanceModal, Layout } from 'components';

import { AuthMenu } from 'components';
import { MODAL } from 'constants/common';
import { withAuth } from 'hoc';
import { useSelectAuthStore } from 'modules/Auth';
import { UserProfile } from 'modules/Users';
// import { useSnackbar } from 'notistack';

const UserPage = () => {
  // const dispatch = useAppDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  // const [user, setUser] = useState<IUser>({});
  const { currentUser } = useSelectAuthStore();

  return (
    <Layout title="Trang cá nhân">
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
              <UserProfile user={currentUser} />
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

export default withAuth(UserPage);
// export default withAuth(UserPage);
