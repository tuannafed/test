import {
  ContentCopy,
  Logout,
  NotificationAddOutlined,
  SupervisedUserCircle
} from '@mui/icons-material';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography
} from '@mui/material';

import React from 'react';

export const ListingMenu: React.FC = () => {
  return (
    <Paper
      sx={{
        width: 320,
        maxWidth: '100%',
        display: {
          md: 'block'
        }
      }}
    >
      <MenuList>
        <MenuItem>
          <ListItemText>
            <Typography variant="h2" color="text.secondary">
              Listing Menu
            </Typography>
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SupervisedUserCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Listing</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <NotificationAddOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Notifications</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};
