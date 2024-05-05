import { Breadcrumbs, Button, Link } from '@mui/material';

import { Home } from '@mui/icons-material';
import React from 'react';

interface BreadcrumbItem {
  id: string;
  name: string;
  url: string;
}

interface LinearBreadcrumbsProps {
  index: number;
  handleBreadcrumbChange?: (value: BreadcrumbItem, index: number) => void;
  data: Array<BreadcrumbItem>;
}

export const LinearBreadcrumb: React.FC<LinearBreadcrumbsProps> = ({
  index,
  handleBreadcrumbChange,
  data
}) => {
  const handlePickMenu = (index: number) => {
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
        <div>
          {data.map((item, idx) => (
            <Button
              key={`menu-${idx}`}
              variant={idx == index ? 'contained' : 'text'}
              sx={{
                padding: '3px 5px',
                marginRight: '5px'
              }}
              onClick={() => {
                handlePickMenu(idx);
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </Breadcrumbs>
    </div>
  );
};
