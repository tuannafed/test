import React, { useEffect, useState } from 'react';
import {
  Divider,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  SxProps,
  Avatar
} from '@mui/material';
import {
  SupervisedUserCircle,
  ContentCopy,
  Favorite,
  AddCircleOutlined,
  Logout,
  ImportExportOutlined
} from '@mui/icons-material';
import { redirect, stackCallback } from 'utils';
import { useAppDispatch } from 'common/hooks';
import { removeToken } from 'common/localStorage';
import { actionsAuth, useSelectCurrentUserStore } from 'modules/Auth';
import { actionsListing } from 'modules/Listings';
import { USER_MENU } from 'constants/common';
import { categoryService } from 'common/api';
import { ICategory } from 'modules/Categories';

interface UserMenuProps {
  containerStyle?: SxProps;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  containerStyle,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const [category, setCategories] = useState<Array<ICategory>>();
  const logout = () => {
    removeToken();
    dispatch(actionsAuth.clearState());
    redirect('/login');
  };

  useEffect(() => {
    categoryService
      .getCategories()
      .then(res => {
        const categories = res.data.data;
        setCategories(categories);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // const goToPage = (categoryId: string) => {

  //      dispatch(actionsListing.setFocusCategory(categoryId));

  // }
  const goToPage = subCategory => {
    redirect(`/listings/${subCategory}`);
  };
  const { role } = useSelectCurrentUserStore();

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
            <AddCircleOutlined color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              dispatch(actionsListing.setStep(0));
              stackCallback(() => redirect('/listings/create'));
            }}
          >
            {USER_MENU.POST_LISTING}
          </ListItemText>
        </MenuItem>
        {role === 'admin' && (
          <MenuItem>
            <ListItemIcon>
              <ImportExportOutlined color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText
              onClick={() => {
                stackCallback(() => redirect('/admin/import_excel'));
              }}
            >
              {USER_MENU.POST_IMPORT_LISTING}
            </ListItemText>
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon>
            <ContentCopy color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              dispatch(actionsListing.setStep(0));
              stackCallback(() => redirect('/user/listings'));
            }}
          >
            {USER_MENU.MANAGE_LIST}
          </ListItemText>
        </MenuItem>
        {/* <Box>
                    <MenuItem>
                        <ListItemIcon>
                            <AddCircleOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText onClick={() => {
                            dispatch(actionsListing.setStep(0));
                            stackCallback(() => redirect('/listings/create'))
                            
                        }} >
                            {USER_MENU.POST_LISTING}
                        </ListItemText>
                    </MenuItem>
                    <Box pl = {4}>
                        <ListItemText 
                            onClick={() => redirect('/listings/create')} 
                            sx = {{
                                paddingY: '3px',
                                paddingLeft: '20px',
                                ":hover": {
                                    cursor: 'pointer'
                                }
                            }}  
                        >
                                {USER_MENU.POST_NEW}
                        </ListItemText>
                        <ListItemText 
                            onClick={() => {
                                dispatch(actionsListing.setStep(0));
                                redirect('/listings/create')
                            }}
                             sx = {{
                                paddingY: '3px',
                                paddingLeft: '20px',
                                ":hover": {
                                    cursor: 'pointer'
                                }
                            }}  
                         >
                                {USER_MENU.MANAGE_LIST}
                        </ListItemText>
                    </Box>
               </Box> */}

        <MenuItem>
          <ListItemIcon>
            <Favorite color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={() => redirect('/user/saved')}>
            {USER_MENU.MARK_LISTING}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => redirect('/user')}>
          <ListItemIcon>
            <SupervisedUserCircle color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>{USER_MENU.ACCOUNT}</ListItemText>
        </MenuItem>
        <Divider />
        {category?.map(category => {
          return (
            <MenuItem key={category._id}>
              <ListItemIcon>
                <Avatar
                  src={category['place_image']}
                  sx={{
                    mr: 1
                  }}
                />
              </ListItemIcon>
              <ListItemText
                onClick={() => goToPage(category['sub_categories'][0]['slug'])}
              >
                {category.name}
              </ListItemText>
            </MenuItem>
          );
        })}
        <Divider />
        {/* <MenuItem>
                    <ListItemText>{USER_MENU.POLICY}</ListItemText>
                </MenuItem>
                <MenuItem>
                     <ListItemText>{USER_MENU.PRIVACY}</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>{USER_MENU.ABOUT}</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>{USER_MENU.HELP}</ListItemText>
                </MenuItem> */}
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>{USER_MENU.LOGOUT}</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};
