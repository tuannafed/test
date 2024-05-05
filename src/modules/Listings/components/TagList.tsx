/* eslint-disable react/display-name */
import { Chip, Stack } from '@mui/material';
import { actionsListing, useSelectFilterListing } from 'modules/Listings';
import React, { useEffect, useState } from 'react';

import { Done } from '@mui/icons-material';
import { listingService } from 'common/api';
import { useAppDispatch } from 'common/hooks';
import { ITag } from '../types';

interface TagListProps {
  subcategory: string;
  initSelectedTags?: string[];
  onTagChange?: (tags: string[]) => void;
}
// const categoryIsEqual = (prev, next) => {
//     return prev.subcategory == next.subcategory
//             && prev?.initSelectedTags?.length == next?.initSelectedTags?.length
// }

export const TagList = React.memo<TagListProps>(
  ({ subcategory, initSelectedTags, onTagChange }) => {
    const listingState = useSelectFilterListing();
    const selectedTags = listingState.tags || initSelectedTags || [];
    const [tags, setTags] = useState<Array<ITag>>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
      listingService
        .getTagsByCategory(subcategory, {})
        .then(({ data }) => {
          const listTags = data.data;
          setTags(listTags);
        })
        .catch(err => {
          console.log(err);
        });
    }, [subcategory]);

    const onClickTag = (tag: ITag) => {
      toggleTags(tag);
    };

    const toggleTags = (tag: ITag) => {
      const copyTags = [...selectedTags];
      if (copyTags.includes(tag._id)) {
        const index = copyTags.indexOf(tag._id);
        copyTags.splice(index, 1);
        dispatch(
          actionsListing.setFilter({
            ...listingState,
            tags: copyTags
          })
        );

        onTagChange && onTagChange(copyTags);
      } else {
        copyTags.push(tag._id);
        dispatch(
          actionsListing.setFilter({
            ...listingState,
            tags: copyTags
          })
        );
        onTagChange && onTagChange(copyTags);
      }
    };

    return (
      <Stack
        direction="row"
        flexWrap="nowrap"
        justifyContent="flex-start"
        sx={{ overflowX: 'scroll' }}
        key="tag-list"
      >
        {tags.map((tag, index) => (
          <Chip
            sx={{
              mx: 1,
              mb: 2,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onDelete={() => onClickTag(tag)}
            deleteIcon={<Done />}
            onClick={() => onClickTag(tag)}
            key={`tag_${index}`}
            label={tag.tag_name}
            color="secondary"
            size="medium"
            variant={selectedTags.includes(tag._id) ? 'filled' : 'outlined'}
          />
        ))}
      </Stack>
    );
  }
);
