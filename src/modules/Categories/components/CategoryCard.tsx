import React, { useEffect, useState } from 'react';
import {
  Card,
  Collapse,
  CardContent,
  Avatar,
  Stack,
  Typography,
  ListItem
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { ICategory } from '../types';
import { useTheme } from '@mui/material';
import { redirect } from 'utils';
import { getDistance, getUserLocation } from 'common/localStorage';

interface ICategoryCardProps {
  category: ICategory;
  collapse?: boolean;
}

export const CategoryCard: React.FC<ICategoryCardProps> = ({
  category,
  collapse
}) => {
  const [isCollapse, setCollapse] = useState(collapse);

  useEffect(() => {
    setCollapse(collapse);
  }, [collapse]);

  const theme = useTheme();
  const categoryStyle = {
    py: 2,
    ':hover': {
      cursor: 'pointer'
    }
  };

  const onClickSubCategory = subCategory => {
    const distance = getDistance();
    const userLocation = getUserLocation();

    if (distance && userLocation?.zipcode) {
      redirect(
        `/listings/${subCategory.slug}?distance=${distance}&zip=${userLocation?.zipcode}`
      );
    } else {
      redirect(`/listings/${subCategory.slug}`);
    }
  };

  return (
    <Card
      key={`category_${category._id}`}
      sx={{
        height: isCollapse ? '100%' : 'inital',
        transition: 'all 0.3s ease-in-out',
        background: isCollapse ? theme.palette.primary.main : 'white',
        color: isCollapse ? 'white' : theme.palette.primary.main,
        ':hover': {
          cursor: 'pointer'
        }
      }}
    >
      <CardContent onClick={() => setCollapse(!isCollapse)}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            ':hover': {
              cursor: 'pointer'
            }
          }}
        >
          <Avatar
            src={category.place_image}
            sx={{
              mr: 2
            }}
          />
          <Typography textAlign="left" width="100%" variant="h6">
            {category.name}
          </Typography>
          <ArrowDropDown />
        </Stack>
      </CardContent>
      <Collapse in={isCollapse}>
        <CardContent sx={{ pl: 9 }}>
          {category.sub_categories.map((subcategory, index) => {
            if (index == category.sub_categories.length - 1) {
              return (
                <ListItem
                  key={`subcategory_${subcategory._id}`}
                  sx={categoryStyle}
                  onClick={() => onClickSubCategory(subcategory)}
                >
                  <Typography variant="body1">{subcategory.name}</Typography>
                </ListItem>
              );
            } else {
              return (
                <ListItem
                  divider
                  key={`subcategory_${subcategory._id}`}
                  sx={categoryStyle}
                  onClick={() => onClickSubCategory(subcategory)}
                >
                  <Typography variant="body1">{subcategory.name}</Typography>
                </ListItem>
              );
            }
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
};

CategoryCard.defaultProps = {
  collapse: false
};
