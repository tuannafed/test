import React from 'react';
import { Backdrop, Box } from '@mui/material';

interface LoadingProps {
  open: boolean;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  open = false,
  className
}) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: theme => theme.zIndex.drawer + 1,
        position: 'fixed',
        backgroundColor: 'transparent'
      }}
      open={open}
      className={className}
    >
      <Box className="spinner"></Box>
    </Backdrop>
  );
};
