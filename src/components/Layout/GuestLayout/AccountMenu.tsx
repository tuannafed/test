import React from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { redirect } from 'utils';
import { useAppDispatch } from 'common/hooks';
import { removeToken } from 'common/localStorage';
import { actionsAuth, useSelectAuthStore } from 'modules/Auth';
import { USER_MENU } from 'constants/common';
export function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { currentUser } = useSelectAuthStore();
  const firstLetter = currentUser.firstname?.charAt(0).toUpperCase();
  const lastLetter = currentUser.lastname?.charAt(0).toUpperCase();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    removeToken();
    dispatch(actionsAuth.clearState());
    redirect('/login');
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={USER_MENU.SETTING_ACCOUNT}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#47487a'
              }}
            >
              {firstLetter}
              {lastLetter}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => redirect('/user')}>
          {USER_MENU.ACCOUNT}
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {USER_MENU.LOGOUT}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
