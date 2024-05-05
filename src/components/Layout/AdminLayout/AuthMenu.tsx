import React from 'react';
import {
  Divider,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  SxProps
} from '@mui/material';
import {
  SupervisedUserCircle,
  ContentCopy,
  Logout,
  Favorite
} from '@mui/icons-material';
import { redirect } from 'utils';
import { useAppDispatch } from 'common/hooks';
import { removeToken } from 'common/localStorage';
import { actionsAuth } from 'modules/Auth';
import { USER_MENU } from 'constants/common';
interface AuthMenuProps {
  containerStyle?: SxProps;
}

export const AuthMenu: React.FC<AuthMenuProps> = ({
  containerStyle,
  ...props
}) => {
  const dispatch = useAppDispatch();

  const logout = () => {
    removeToken();
    dispatch(actionsAuth.clearState());
    redirect('/login');
  };

  return (
    <Paper
      sx={{
        width: 320,
        maxWidth: '100%',
        display: {
          md: 'block'
        },
        ...containerStyle
      }}
    >
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <SupervisedUserCircle color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={() => redirect('/user')}>
            {USER_MENU.PAGE_ACCOUNT}
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={() => redirect('/user/listings')}>
            {USER_MENU.MANAGE_LIST}
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Favorite color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={() => redirect('/user/saved')}>
            {USER_MENU.MARK_LISTING}
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>{USER_MENU.LOGOUT}</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};
