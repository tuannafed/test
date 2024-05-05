import React, { useEffect } from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useWindowSize } from 'hooks';
import { useAppDispatch } from 'common/hooks';
import { actionsApp } from 'modules/App';

interface AuthLayout {
  title: string | undefined;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayout> = ({ title, children }) => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!width) return;
    width < 768
      ? dispatch(actionsApp.closeSidebar())
      : dispatch(actionsApp.openSidebar());
  }, [dispatch, width]);

  return (
    <Box component="main" display="flex">
      <Header title={title} />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
