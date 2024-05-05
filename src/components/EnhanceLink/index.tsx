import React from 'react';
import { Box, LinkProps, Link as NavLink } from '@mui/material';
import Link from 'next/link';
import { theme } from 'themes';

export interface EnhanceLinkProps extends LinkProps {
  name?: string;
  url: string;
  children?: React.ReactNode;
}

export const EnhanceLink: React.FC<EnhanceLinkProps> = ({
  name,
  url,
  sx,
  children,
  ...props
}) => {
  const sxs = {
    ...sx,
    transition: 'all 0.25s',
    '&:hover': { opacity: 0.85 }
  };
  return (
    <>
      {name ? (
        <Link href={url}>
          <NavLink href={url} sx={sxs} {...props}>
            {name}
          </NavLink>
        </Link>
      ) : (
        <Link href={url}>
          <Box
            component="a"
            href={url}
            sx={{
              ...sxs,
              color: theme.palette.text.primary,
              textDecoration: 'none'
            }}
            {...props}
          >
            {children}
          </Box>
        </Link>
      )}
    </>
  );
};
