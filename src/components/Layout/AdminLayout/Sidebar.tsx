import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  styled
} from '@mui/material';
import { actionsApp, useSelectAppToggleSidebar } from 'modules/App';

import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PeopleIcon from '@mui/icons-material/People';
import QuizIcon from '@mui/icons-material/Quiz';
import MuiDrawer from '@mui/material/Drawer';
import { useAppDispatch } from 'common/hooks';
import { useSelectCurrentUserStore } from 'modules/Auth';
import { actionsUser } from 'modules/Users';
import { redirect } from 'utils';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { role } = useSelectCurrentUserStore();
  const isToggle = useSelectAppToggleSidebar();

  const toggleDrawer = () => {
    dispatch(actionsApp.toggleSidebar());
  };

  return (
    <Drawer variant="permanent" open={isToggle}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <span style={{ marginRight: 10 }}>
            {' '}
            <b>Ahaviet</b>
          </span>
          <span style={{ fontSize: 20, marginRight: 20 }}>
            <b>admin</b>
          </span>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {role === 'admin' && (
          <ListItemButton
            component="a"
            onClick={() => {
              redirect('/admin/import_excel');
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng bài hàng loạt" />
          </ListItemButton>
        )}
        {role === 'admin' && (
          <ListItemButton
            component="a"
            onClick={() => {
              redirect('/account/user');
              dispatch(
                actionsUser.updateQuizActions({ isShow: false, isAdd: true })
              );
            }}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        )}
        <ListItemButton component="a">
          <ListItemIcon>
            <QuizIcon />
          </ListItemIcon>
          <ListItemText primary="Quizzes" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};
