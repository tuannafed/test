import React, { useEffect, useState } from 'react';
import { Box, IconButton, SwipeableDrawer } from '@mui/material';
import { useWindowSize } from 'hooks';
import MenuIcon from '@mui/icons-material/Menu';
import { UserMenu } from './UserMenu';
import { AuthMenu } from '../AdminLayout/AuthMenu';
import { useRouter } from 'next/router';

export const MenuSP = () => {
  const { width } = useWindowSize();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const router = useRouter();
  const isPrivate = router.pathname.includes('/user') ? true : false;

  useEffect(() => {
    if (!width) return;
    width > 1200 && setOpenMenu(false);
  }, [width]);

  return (
    <Box display={{ sm: 'flex' }}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => setOpenMenu(!openMenu)}
        color="inherit"
        sx={{ ml: -1 }}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={openMenu}
        swipeAreaWidth={0}
        onClose={() => setOpenMenu(false)}
        onOpen={() => setOpenMenu(true)}
      >
        <Box width={300}>{isPrivate ? <AuthMenu /> : <UserMenu />}</Box>
      </SwipeableDrawer>
    </Box>
  );
};
