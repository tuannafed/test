import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { useAppDispatch } from 'common/hooks';
import { useSelectListings } from 'modules/Listings';
import { actionsCategory } from '../redux';
import { ICategory } from '../types';
import { CategoryCard } from './CategoryCard';

export const CategoryGridList: React.FC = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const dispatch = useAppDispatch();

  const { focusCategory } = useSelectListings();

  useEffect(() => {
    dispatch(actionsCategory.getCategories({}))
      .unwrap()
      .then(categories => {
        setCategories(categories.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <Grid container rowSpacing={2} columnSpacing={4}>
        {categories.map((category, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CategoryCard
                category={category}
                collapse={category._id == focusCategory}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
