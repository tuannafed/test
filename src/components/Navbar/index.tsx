import React from 'react';
import { EnhanceLink, EnhanceLinkProps } from 'components';
import { MenuItem, MenuList } from '@mui/material';
import { theme } from 'themes';

export interface NavbarProps {
  className?: string;
  data: EnhanceLinkProps[];
}

export const Navbar: React.FC<NavbarProps> = ({ data = [], className }) => {
  return (
    <MenuList
      className={className}
      sx={{
        [theme.breakpoints.up('md')]: {
          display: 'flex',
          alignItems: 'center'
        }
      }}
    >
      {data?.map((item, i) => (
        <MenuItem
          key={i}
          sx={{
            mx: { md: 3 },
            px: { xs: 3, md: 3 },
            py: { xs: 1, md: 0.75 },
            ':hover': {
              borderRadius: '40px'
            }
          }}
        >
          <EnhanceLink
            url={item.url}
            name={item.name}
            color="#FFF"
            target="_blank"
            underline="none"
          />
        </MenuItem>
      ))}
    </MenuList>
  );
};
