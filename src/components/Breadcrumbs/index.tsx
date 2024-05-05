import { Home, KeyboardArrowDown } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Menu,
  MenuItem,
  MenuProps,
  alpha,
  styled
} from '@mui/material';

import React from 'react';

export interface BreadcrumbItem {
  id: string;
  name: string;
  url: string;
}

interface CustomBreadcrumbsProps {
  index: number;
  handleBreadcrumbChange?: (value: BreadcrumbItem, index: number) => void;
  data: Array<BreadcrumbItem>;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}));

export const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({
  data,
  index,
  handleBreadcrumbChange
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const activeIndex = index;
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePickMenu = (index: number) => {
    handleClose();
    handleBreadcrumbChange && handleBreadcrumbChange(data[index], index);
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" separator=">">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontSize: '22px' }}
          color="inherit"
          href="/"
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
        </Link>
        <Box>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            size="small"
            sx={{
              borderRadius: '20px',
              padding: '3px 20px'
            }}
            onClick={handleClick}
            endIcon={<KeyboardArrowDown />}
          >
            {(data[activeIndex] && data[activeIndex].name) || 'All'}
          </Button>

          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {data.map((breadcrumb, index) => {
              return (
                <MenuItem
                  onClick={() => {
                    handlePickMenu(index);
                  }}
                  disableRipple
                  key={`menu_category_${index}`}
                >
                  {breadcrumb.name}
                </MenuItem>
              );
            })}
          </StyledMenu>
        </Box>
      </Breadcrumbs>
    </div>
  );
};

CustomBreadcrumbs.defaultProps = {
  data: [],
  index: 0
};
